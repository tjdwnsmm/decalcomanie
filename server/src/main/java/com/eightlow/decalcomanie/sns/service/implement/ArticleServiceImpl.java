package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
<<<<<<< server/src/main/java/com/eightlow/decalcomanie/sns/service/implement/ArticleServiceImpl.java
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import com.eightlow.decalcomanie.sns.entity.Comment;
import com.eightlow.decalcomanie.sns.mapper.ArticleMapper;
import com.eightlow.decalcomanie.sns.mapper.ArticlePerfumeMapper;
import com.eightlow.decalcomanie.sns.mapper.CommentMapper;
import com.eightlow.decalcomanie.sns.repository.ArticlePerfumeRepository;
import com.eightlow.decalcomanie.sns.repository.ArticleRepository;
import com.eightlow.decalcomanie.sns.repository.CommentRepository;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ArticleServiceImpl implements IArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    private final ArticlePerfumeRepository articlePerfumeRepository;
    private final ArticlePerfumeMapper articlePerfumeMapper;

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;


    @Override
    public boolean existArticleById(int id) {
        return false;
    }

    @Override
    @Transactional
    public int createArticle(ArticleDto articleDto) {
        log.info("ArticleServiceImpl::: createArticle start");
        Article article = articleRepository.save(articleMapper.toEntity(articleDto));
        System.out.println(article.getArticleId());
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
        return article.getArticleId();
    }

    @Override
    @Transactional
    public void updateArticle(ArticleDto articleDto) {
        log.info("ArticleServiceImpl::: updateArticle start");
        Article article = articleRepository.save(articleMapper.toEntity(articleDto));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
    }

    @Override
    @Transactional
    public void deleteArticle(int articleId) {
        log.info("ArticleServiceImpl::: deleteArticle start");
        articleRepository.deleteById(articleId);
//        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
    }

    @Override
    @Transactional
    public void createArticlePerfume(int articleId, List<Integer> perfumes) {
        log.info("ArticleServiceImpl::: createArticlePerfume start");
        for (int i = 0; i < perfumes.size(); i++) {
            ArticlePerfumeDto articlePerfumeDto = new ArticlePerfumeDto(articleId, perfumes.get(i));
            articlePerfumeRepository.save(articlePerfumeMapper.toEntity(articlePerfumeDto));
        }
        log.info("ArticleServiceImpl::: finish ");
    }


    @Override
    public ArticleDto searchArticleByArticleId(int articleId) {
        log.info("ArticleServiceImpl::: searchArticleByArticleId start");
        ArticleDto article = articleMapper.toDto(articleRepository.findByArticleId(articleId));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
        return article;
    }

    @Override
    public List<ArticleDto> searchArticleByUserId(UUID userId) {
        return null;
    }

    @Override
    public List<ArticleDto> searchArticleByPerfumeId(UUID userId) {
        return null;
    }

    @Override
    @Transactional
    public List<Integer> searchArticlePerfumeId(int articleId) {
        log.info("ArticleServiceImpl::: searchArticlePerfumeId start");
        List<ArticlePerfume> articlePerfumes = articlePerfumeRepository.findByArticleId(articleId);
        List<Integer> perfumes = new ArrayList<>();
        for(ArticlePerfume perfume : articlePerfumes) {
            perfumes.add(perfume.getPerfumeId());
        }
        log.info("ArticleServiceImpl::: finish ", String.valueOf(perfumes));
        return perfumes;
    }

    /*
        댓글 파트
     */
    @Override
    @Transactional
    public void createComment(CommentDto commentDto) {
        log.info("ArticleServiceImpl::: createComment start");
        Comment comment = commentRepository.save(commentMapper.toEntity(commentDto));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(comment));
    }

    @Override
    @Transactional
    public ResponseEntity<Response> updateComment(CommentDto commentDto) {
        log.info("ArticleServiceImpl::: updateComment start");
        // 수정하려는 댓글의 commentId를 가져옴
        int commentId = commentDto.getCommentId();
        int articleId = commentDto.getArticleId();

        // 해당 commentId를 가진 댓글 조회
        Optional<Comment> optionalComment = commentRepository.findByArticleIdAndCommentId(articleId, commentId);

        // 해당 commentId를 가진 댓글이 존재하는지 확인
        if (optionalComment.isPresent()) {
            // 댓글이 존재하는 경우, 수정 작업 진행
            Comment existingComment = optionalComment.get();

            // 댓글의 userId와 수정하려는 userId를 비교하여 일치하는지 확인
            if (existingComment.getUserId().equals(commentDto.getUserId())) {
                // 일치하는 경우, 수정 작업 진행
                // 수정할 내용을 업데이트
                // existingComment.builder().content(commentDto.getContent()).build();
                existingComment.setContent(commentDto.getContent());

                // 수정된 댓글 저장
                Comment comment = commentRepository.save(existingComment);

                log.info("ArticleServiceImpl::: finish ", String.valueOf(comment));
            } else {
                // userId가 일치하지 않는 경우, 권한이 없음을 알리는 예외 또는 메시지를 반환
                // throw new UnauthorizedAccessException("댓글을 수정할 권한이 없습니다.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Response.builder()
                                .message("잘못된 사용자 접근입니다.")
                                .build());
            }

//        } else {
//            // 해당 commentId를 가진 댓글이 존재하지 않는 경우, 적절한 예외 또는 메시지를 반환
////            throw new CommentNotFoundException("해당 댓글을 찾을 수 없습니다.");
//        }
//        Comment comment = commentRepository.save(commentMapper.toEntity(commentDto));
//        log.info("ArticleServiceImpl::: finish ", String.valueOf(comment));
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                Response.builder()
                        .message("댓글이 수정되었습니다.")
                        .build());
    }
}
