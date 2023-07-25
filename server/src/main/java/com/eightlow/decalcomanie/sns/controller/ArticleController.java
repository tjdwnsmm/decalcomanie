package com.eightlow.decalcomanie.sns.controller;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;

import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.dto.request.CommentRequest;
import com.eightlow.decalcomanie.sns.dto.request.CreateArticleRequest;
import com.eightlow.decalcomanie.sns.dto.request.CreateCommentRequest;
import com.eightlow.decalcomanie.sns.dto.request.UpdateArticleRequest;
import com.eightlow.decalcomanie.sns.dto.response.ArticleResponse;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.sns.mapper.ArticleDtoMapper;
import com.eightlow.decalcomanie.sns.mapper.CommentDtoMapper;
import com.eightlow.decalcomanie.sns.mapper.GradeMapper;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import com.eightlow.decalcomanie.sns.service.IGradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/sns")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@Slf4j
public class ArticleController {
    private final IArticleService articleService;
    private final IGradeService gradeService;

    private final ArticleDtoMapper articleDtoMapper;
    private final CommentDtoMapper commentDtoMapper;

    @PostMapping("/create")
    public ResponseEntity<Response> createArticle(@RequestBody @Valid CreateArticleRequest createArticleRequest) {
        ArticleDto articleDto = articleDtoMapper.fromCreateArticleRequest(createArticleRequest);
        int articleId = articleService.createArticle(articleDto);

        // grade테이블에도 향수에대한 평가 넣어주기
        gradeService.createOrModifyGradeFromRequest(createArticleRequest.getUserId(),
                createArticleRequest.getPerfumeId(), createArticleRequest.getRate());
        
        // 게시물에 임베디드된 향수들을 테이블에 저장
        articleService.createArticlePerfume(articleId, createArticleRequest.getPerfumeId());

        //TODO
        // 평점 등록시 perfume테이블의 평점 수정!!!
        // perfume 쪽과 합쳐지고 나면 perfume의 service를 통핵서 평점 갱신 필요

        return ResponseEntity.status(HttpStatus.OK)
                .body(Response.builder()
                        .message("글이 정상 등록되었습니다.")
                        .build());
    }

    @GetMapping("/search/{articleId}")
    public ResponseEntity<ArticleResponse> getDetailById(@PathVariable int articleId) {
        ArticleDto articleDto = articleService.searchArticleByArticleId(articleId);
        System.out.println(articleDto.getUserId());

        //articleId를 통해서 게시물의 임베디드된 향수를 가져온다.
        List<Integer> perfumeIdList = articleService.searchArticlePerfumeId(articleId);
        log.info(perfumeIdList.toString());

        // 향수들의 평점도 가져온다
        List<GradeDto> rates = gradeService.searchGradesByPerfumeId(articleDto.getUserId(), perfumeIdList);
        log.info(rates.toString());

        // 댓글 리스트를 포함한다.
        List<CommentDto> comments = articleService.getComments(articleDto.getArticleId());
        System.out.println(comments);

        ArticleResponse articleResponse = new ArticleResponse(articleDto, comments, perfumeIdList, rates);
        //TODO
        // 현재 데이터가 article 부분만 뜸
        // isheart, isBookMark 정보를 ArticleResponse에 담아서 더 보내줘야함!!!

        System.out.println(articleResponse);
        return ResponseEntity.status(HttpStatus.OK).body(articleResponse);
    }

    @PutMapping("/update")
    public ResponseEntity<Response> modifyArticle(@RequestBody @Valid
                                                        UpdateArticleRequest updateArticleRequest) {
        ArticleDto articleDto = articleDtoMapper.fromUpdateArticleRequest(updateArticleRequest);
        int status = articleService.updateArticle(articleDto);

        // 글 수정이 성공 한 경우
        if(status == 200) {
            // 향수 평가도 수정
            gradeService.createOrModifyGradeFromRequest(updateArticleRequest.getUserId(),
                    updateArticleRequest.getPerfumeId(), updateArticleRequest.getRate());
        }

        // 수정 된걸 보여주는건 프런트 단에서 다시 get을 보내주는것이 맞는것 같다!!
        return resultMessage(status);
    }

    @DeleteMapping("/delete/{articleId}")
    public ResponseEntity<Response> deleteArticle(@RequestHeader(value = "userId") String userId, @PathVariable int articleId) {
        // 글 삭제
        int status = articleService.deleteArticle(userId, articleId);
        
        //글 삭제가 정상적으로 되었다면 댓글, 게시물 향수, 평가한 평점 정보 삭제 실행
        if(status == 200) {
            // 글삭제시 그 게시물에 달린 댓글 전부 삭제
            articleService.deleteCommentByArticleId(articleId);

            //articleId를 통해서 게시물의 임베디드된 향수를 가져온다.
            List<Integer> perfumeIdList = articleService.searchArticlePerfumeId(articleId);

            // 임베디드된 게시물 향수 삭제
            articleService.deleteArticlePerfumeByArticleId(articleId);

            // 글삭제시 향수들 평점 정보 삭제
            gradeService.deleteGradesByUserIdAndPerfumeId(userId, perfumeIdList);
        }

        // TODO: 글삭제시 사용자의 post갯수 줄여줘야함

        return resultMessage(status);
    }


    /* 댓글 작업 part*/
    @PostMapping("/comment/create")
    public ResponseEntity<Response> createComment(@RequestBody CommentRequest commentRequest) {
        CommentDto commentDto = commentDtoMapper.fromCommentRequest(commentRequest);
        articleService.createComment(commentDto);
//        return ResponseEntity.status(HttpStatus.OK).body();
        return ResponseEntity.status(HttpStatus.OK)
                .body(Response.builder()
                        .message("댓글이 정상 등록되었습니다.")
                        .build());
    }

    @PutMapping("/comment/update")
    public ResponseEntity<Response> updateComment(@RequestBody CommentRequest commentRequest) {
        CommentDto commentDto = commentDtoMapper.fromCommentRequest(commentRequest);
        System.out.println(commentDto);
        ResponseEntity<Response> response = articleService.updateComment(commentDto);
        return response;
//        return null;
//        return ResponseEntity.status(HttpStatus.OK).body();
    }

    @DeleteMapping("/comment/delete/{commentId}")
    public ResponseEntity<Response> deleteComment(@RequestBody CommentRequest commentRequest) {
        CommentDto commentDto = commentDtoMapper.fromCommentRequest(commentRequest);
        System.out.println(commentDto);
        // 댓글 삭제
        int statusCode = articleService.deleteComment(commentDto);

        // 댓글 삭제시 article 테이블의 comment의 갯수를 줄여준다
        articleService.modifyCommentCount(commentDto.getArticleId());

        return resultMessage(statusCode);
    }

    public ResponseEntity<Response> resultMessage(int status) {
        if (status == 200) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Response.builder()
                            .message("정상적으로 수행되었습니다.")
                            .build());
        } else if (status == 401) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Response.builder()
                            .message("잘못된 사용자 접근입니다.")
                            .build());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Response.builder()
                            .message("404")
                            .build());
        }
    }
}
