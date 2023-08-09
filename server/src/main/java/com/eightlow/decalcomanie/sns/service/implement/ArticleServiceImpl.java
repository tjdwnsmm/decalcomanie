package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.sns.dto.*;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.sns.entity.*;
import com.eightlow.decalcomanie.sns.mapper.*;
import com.eightlow.decalcomanie.sns.repository.*;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.spec.PSource;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ArticleServiceImpl implements IArticleService {

    private final IUserService userService;

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    private final ArticlePerfumeRepository articlePerfumeRepository;
    private final ArticlePerfumeMapper articlePerfumeMapper;

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    private final HeartRepository heartRepository;
    private final HeartMapper heartMapper;

    private final BookMarkRepository bookmarkRepository;
    private final BookMarkMapper bookmarkMapper;

    private final EntityManager entityManager;


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
    public int updateArticle(ArticleDto articleDto, String userId) {
        log.info("ArticleServiceImpl::: updateArticle start");

        // 수정하려는 글의 articleId를 가져옴
        int articleId = articleDto.getArticleId();

        // 해당 articleId를 가진 글 조회
        Article article = entityManager.find(Article.class, articleId);
//        Optional<Article> optionalArticle = articleRepository.findByArticleId(articleId);

        // 해당 articleId를 가진 글이 존재하는지 확인
        if (article != null) {
            // 글이 존재하는 경우, 수정 작업 진행
            // 글의 userId와 수정하려는 userId를 비교하여 일치하는지 확인
            if (article.getUserId().equals(userId)) {
                // 일치하는 경우, 수정 작업 진행
                // 수정할 내용을 업데이트
                ArticleDto updatedArticleDto = articleDto.toBuilder()
                        .updatedAt(LocalDateTime.now())
                        .build();
                System.out.println(LocalDateTime.now());
                // existingArticle.setContent(commentDto.getContent());

                // 수정된 글 저장
                articleRepository.save(articleMapper.toEntity(articleDto));

                log.info("ArticleServiceImpl::: finish ");
            } else {
                // userId가 일치하지 않는 경우, 권한이 없음을 알리는 예외 또는 메시지를 반환
                // throw new UnauthorizedAccessException("댓글을 수정할 권한이 없습니다.");
                return 401;
            }
        }

        //TODO:
        // 해당 articleId를 가진 글이 존재하지 않는 경우, 적절한 예외 또는 메시지를 반환 하도록 해보자 (else해서)

        return 200;
    }

    @Override
    @Transactional
    public int deleteArticle(String userId, int articleId) {
        log.info("ArticleServiceImpl::: deleteArticle start");
        // 해당 articleId를 가진 글 조회
        Article article = entityManager.find(Article.class, articleId);
        // Optional<Article> optionalArticle = articleRepository.findByArticleId(articleId);

        // 해당 articleId를 가진 글이 존재하는지 확인
        if (article != null) {
            // 글이 존재하는 경우, 삭제 작업 진행

            // 댓글의 userId와 수정하려는 userId를 비교하여 일치하는지 확인
            if (article.getUserId().equals(userId)) {
                articleRepository.deleteById(articleId);
            } else {
                // userId가 일치하지 않는 경우, 권한이 없음을 알리는 예외 또는 메시지를 반환
                // throw new UnauthorizedAccessException("댓글을 수정할 권한이 없습니다.");
                return 401;
            }
        }
        //TODO
        // 1. 사용자 인증 로직 추가
        // 2. status code 리턴 필요

//        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
        return 200;
    }

//    @Override
//    @Transactional
//    public void createArticlePerfume(int articleId, List<Integer> perfumes) {
//        log.info("ArticleServiceImpl::: createArticlePerfume start");
//        for (int i = 0; i < perfumes.size(); i++) {
//            ArticlePerfumeDto articlePerfumeDto = new ArticlePerfumeDto(articleId, perfumes.get(i));
//            articlePerfumeRepository.save(articlePerfumeMapper.toEntity(articlePerfumeDto));
//        }
//        log.info("ArticleServiceImpl::: finish ");
//    }


    @Override
    @Transactional
    public ArticleDto searchArticleByArticleId(int articleId) {
        log.info("ArticleServiceImpl::: searchArticleByArticleId start");
        ArticleDto article = articleMapper.toDto(entityManager.find(Article.class, articleId));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
        return article;
    }



    /*
        피드(글) 조회 파트
     */
    @Override
    @Transactional
    public List<ArticleDto> searchArticleByUserId(String userId) {
        return articleMapper.toDto(articleRepository.findByUserId(userId));
    }

    @Override
    @Transactional
    public List<ArticleDto> searchArticlesOfFollowingUser(String userId) {

        List<FollowingResponse> followingResponses = userService.getFollowingUsers(userId);
        System.out.println(followingResponses.toString());

        List<String> userIds = followingResponses.stream()
                .map(FollowingResponse::getUserId)
                .collect(Collectors.toList());
        log.info(String.valueOf(userIds));

        List<ArticleDto> articles = new ArrayList<>();

        // 팔로워들의 글을 다 가져옴 (select 한번에)
        articles= articleMapper.toDto(articleRepository.findByUserIdIn(userIds));
//        for(String id : userIds) {
//            articles.addAll(searchArticleByUserId(id));
//        }


        Collections.sort(articles, Comparator.comparing(ArticleDto::getCreatedAt).reversed());
        log.info(articles.toString());
        return articles;
    }

    @Override
    @Transactional
    public List<ArticleDto> searchPopularArticles() {
        return articleMapper.toDto(articleRepository.findArticlesOrderByHeart());
    }

    @Override
    @Transactional
    public List<ArticleDto> searchLatestArticles() {
        return articleMapper.toDto(articleRepository.findArticlesOrderByCreateTime());
    }

    @Override
    @Transactional
    public List<ArticleDto> searchArticleByPerfumeId(int perfumeId) {
        List<ArticlePerfume> articlePerfumes = articlePerfumeRepository.findByPerfume_PerfumeId(perfumeId);
        List<Integer> articleIds = new ArrayList<>();
        for(ArticlePerfume articlePerfume : articlePerfumes) {
            articleIds.add(articlePerfume.getArticle().getArticleId());
        }

        // articleId를 통해 정보 조회 (select한번)
        List<Article> articles = new ArrayList<>();
        articles = articleRepository.findByArticleIdIn(articleIds);
//        for(int articleId : articleIds) {
//            articles.add(articleRepository.findByArticleId(articleId).get());
//        }
        System.out.println(articles);
        return articleMapper.toDto(articles);
    }




    // 피드 조회 끝

    @Override
    @Transactional
    public List<Integer> searchArticlePerfumeId(int articleId) {
        log.info("ArticleServiceImpl::: searchArticlePerfumeId start");
        List<ArticlePerfume> articlePerfumes = articlePerfumeRepository.findByArticle_ArticleId(articleId);
        List<Integer> perfumes = new ArrayList<>();
        for(ArticlePerfume perfume : articlePerfumes) {
            perfumes.add(perfume.getPerfume().getPerfumeId());
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
        System.out.println(commentDto);
        // TODO: 이 부분이 select로 데이터를 많이 가져옴 (개선 가능성 있음)
        Article article = articleRepository.findByArticleId(commentDto.getArticleId()).orElse(null);

        Comment comment = Comment.builder()
                .article(article)
                .userId(commentDto.getUserId())
                .content(commentDto.getContent())
                .build();

        commentRepository.save(comment);

        // TODO: 댓글 갯수 하나 늘려 주는 부분 추가 필요
        // 게시물의 heart갯수 + 1
        articleRepository.increaseCommentCount(commentDto.getArticleId());

        log.info("ArticleServiceImpl::: finish ");
    }

    @Override
    @Transactional
    public ResponseEntity<Response> updateComment(CommentDto commentDto) {
        log.info("ArticleServiceImpl::: updateComment start");
        // 수정하려는 댓글의 commentId를 가져옴
        int commentId = commentDto.getCommentId();
        int articleId = commentDto.getArticleId();

        // 해당 commentId를 가진 댓글 조회
        Comment comment = entityManager.find(Comment.class, commentId);
//        Optional<Comment> optionalComment = commentRepository.findByArticleIdAndCommentId(articleId, commentId);

        // 해당 commentId를 가진 댓글이 존재하는지 확인
        if (comment != null) {
            // 댓글이 존재하는 경우, 수정 작업 진행
            // Comment existingComment = optionalComment.get();

            // 댓글의 userId와 수정하려는 userId를 비교하여 일치하는지 확인
            if (comment.getUserId().equals(commentDto.getUserId())) {
                // 일치하는 경우, 수정 작업 진행
                // 수정할 내용을 업데이트
                // existingComment.toBuilder().content(commentDto.getContent()).build();
                Comment existingComment = comment.toBuilder().content(commentDto.getContent()).build();
//                existingComment.setContent(commentDto.getContent());

                // 수정된 댓글 저장
                commentRepository.save(existingComment);

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

    @Override
    public int deleteComment(int commentId, String userId) {
        log.info("ArticleServiceImpl::: updateComment start");

        // 해당 commentId를 가진 댓글 조회
        Comment comment = entityManager.find(Comment.class, commentId);
        System.out.println(comment);

        // 해당 commentId를 가진 댓글이 존재하는지 확인
        if (comment != null) {
            // 댓글이 존재하는 경우, 삭제 작업 진행
            // 댓글의 userId와 수정하려는 userId를 비교하여 일치하는지 확인
            if (comment.getUserId().equals(userId)) {
                // 일치하는 경우, 삭제 작업 진행
                try {
                    commentRepository.deleteByCommentId(commentId);
                } catch (Exception e) {
                    log.info(e.getMessage());
                }
            } else {
                // userId가 일치하지 않는 경우, 권한이 없음을 알리는 예외 또는 메시지를 반환
                // throw new UnauthorizedAccessException("댓글을 수정할 권한이 없습니다.");
                return 401;
            }

//        } else {
//            // 해당 commentId를 가진 댓글이 존재하지 않는 경우, 적절한 예외 또는 메시지를 반환
////            throw new CommentNotFoundException("해당 댓글을 찾을 수 없습니다.");
//        }
//        Comment comment = commentRepository.save(commentMapper.toEntity(commentDto));
//        log.info("ArticleServiceImpl::: finish ", String.valueOf(comment));
        } else {
            return -1;
        }
        return 200;
    }

    @Override
    public void increaseCommentCount(int articleId) {
        log.info("ArticleServiceImpl::: modifyCommentCount start");
        // 주어진 articleId 의 comment 갯수를 하나 늘린다.
        articleRepository.increaseCommentCount(articleId);
        log.info("ArticleServiceImpl::: finish ");
    }

    @Override
    @Transactional
    public void decreaseCommentCount(int articleId) {
        log.info("ArticleServiceImpl::: modifyCommentCount start");
        // 주어진 articleId 의 comment 갯수를 하나 줄인다.
        articleRepository.decreaseCommentCount(articleId);
        log.info("ArticleServiceImpl::: finish ");
    }

    @Override
    @Transactional
    public List<CommentDto> getComments(int articleId) {
        log.info("ArticleServiceImpl::: getComments start");
        List<Comment> comments = commentRepository.findByArticle_ArticleId(articleId);
        log.info("ArticleServiceImpl::: finish ", String.valueOf(comments));
        return commentMapper.toDTO(comments);
    }

    @Override
    @Transactional
    public int deleteCommentByArticleId(int articleId) {
        // 이미 글을 삭제할때 글의 userId를 확인했음으로 여기서는 확인을 하지 않고 삭제를 진행
        log.info("ArticleServiceImpl::: deleteCommentByArticleId start");
        commentRepository.deleteAllByArticleId(articleId);
        log.info("ArticleServiceImpl::: deleteCommentByArticleId finish");
        return 200;
    }

    @Override
    @Transactional
    public void deleteArticlePerfumeByArticleId(int articleId) {
        log.info("ArticleServiceImpl::: deleteArticlePerfumeByArticleId start");
        // 이미 글을 삭제할때 글의 userId를 확인했음으로 여기서는 확인을 하지 않고 삭제를 진행
        articlePerfumeRepository.deleteAllByArticleId(articleId);
        log.info("ArticleServiceImpl::: deleteArticlePerfumeByArticleId finish");
    }

    @Override
    @Transactional
    public int likeArticle(HeartDto heartDto) {
        log.info("ArticleServiceImpl::: likeArticle start");
        // Heart 테이블에 좋아요 저장
        heartRepository.save(heartMapper.toEntity(heartDto));

        // 게시물의 heart갯수 + 1
        articleRepository.increaseHeartCountByArticleId(heartDto.getArticleId());

        log.info("ArticleServiceImpl::: likeArticle finish");
        return 200;
    }

    @Override
    @Transactional
    public int dislikeArticle(HeartDto heartDto) {
        log.info("ArticleServiceImpl::: likeArticle start");
        // Heart 테이블에 좋아요한 부분 제거
        heartRepository.deleteByArticleIdAndUserId(heartDto.getArticleId(), heartDto.getUserId());

        // 게시물의 heart갯수 - 1
        articleRepository.decreaseHeartCountByArticleId(heartDto.getArticleId());

        log.info("ArticleServiceImpl::: likeArticle finish");
        return 200;
    }

    @Override
    @Transactional
    public int bookmarkArticle(BookMarkDto bookmarkDto) {
        log.info("ArticleServiceImpl::: bookmarkArticle start");
        bookmarkRepository.save(bookmarkMapper.toEntity(bookmarkDto));
        log.info("ArticleServiceImpl::: bookmarkArticle finish");
        return 200;
    }

    @Override
    @Transactional
    public int cancelBookmarkArticle(BookMarkDto bookmarkDto) {
        log.info("ArticleServiceImpl::: cancelBookmarkArticle start");
        bookmarkRepository.deleteByArticleIdAndUserId(bookmarkDto.getArticleId(), bookmarkDto.getUserId());
        log.info("ArticleServiceImpl::: cancelBookmarkArticle finish");
        return 200;
    }

    // 사용자가 좋아요를 누른 게시물인지 확인
    @Override
    @Transactional
    public boolean checkHeartArticle(int articleId, String userId) {
        Optional<Heart> hearts = heartRepository.findByArticle_ArticleIdAndUserId(articleId, userId);

        if(hearts.isPresent()) {
            return true;
        }
        return false;
    }

    // 사용자가 북마크를 누른 게시물인지 확인
    @Override
    public boolean checkBookmarkArticle(int articleId, String userId) {
        Optional<BookMark> bookmarks = bookmarkRepository.findByArticleIdAndUserId(articleId, userId);

        if(bookmarks.isPresent()) {
            return true;
        }

        return false;
    }


    // request로 부터 userId를 뽑아내는 공통메서드
    @Override
    public String getUserIdFromRequest(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        return userId;
    }
}
