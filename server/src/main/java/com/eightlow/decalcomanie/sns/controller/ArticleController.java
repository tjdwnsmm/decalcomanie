package com.eightlow.decalcomanie.sns.controller;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.dto.request.CreateArticleRequest;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.sns.mapper.ArticleDtoMapper;
import com.eightlow.decalcomanie.sns.mapper.GradeMapper;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import com.eightlow.decalcomanie.sns.service.IGradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/sns")
@RequiredArgsConstructor
@Slf4j
public class ArticleController {
    private final IArticleService articleService;
    private final IGradeService gradeService;

    private final ArticleDtoMapper articleDtoMapper;


    @PostMapping("/create")
    public ResponseEntity<Response> createArticle(@RequestBody @Valid CreateArticleRequest createArticleRequest) {
        ArticleDto articleDto = articleDtoMapper.fromCreateArticleRequest(createArticleRequest);
        articleService.createArticle(articleDto);

        // 임베디드한  향수 리스트
        List<Integer> perfumes = createArticleRequest.getPerfumeId();

        // 각 향수에 대한 평점
        List<Integer> rates = createArticleRequest.getRate();

        // 여러개의 향수를 임베디드하고 평점을 남긴경우 Grade 테이블에 데이터를 저장하기 위함
        for (int i = 0; i < perfumes.size(); i++) {
            GradeDto gradeDto = new GradeDto(createArticleRequest.getUserId(), perfumes.get(i), rates.get(i));
            gradeService.createGrade(gradeDto);
        }

        //TODO
        // 평점 등록시 perfume테이블의 평점 수정!!!
        // perfume 쪽과 합쳐지고 나면 perfume의 service를 통핵서 평점 갱신 필요




        return ResponseEntity.status(HttpStatus.OK)
                .body(Response.builder()
                        .message("글이 정상 등록되었습니다.")
                        .build());
    }

    @GetMapping("/search/{articleId}")
    public ResponseEntity<ArticleDto> getDetailById(@PathVariable int articleId) {
        ArticleDto articleDto = articleService.searchArticleByArticleId(articleId);
        //TODO
        // 현재 데이터가 article 부분만 뜸
        // 댓글 list와 isheart, isBookMark 정보를 담아서 더 보내줘야함!!!

        return ResponseEntity.status(HttpStatus.OK).body(articleDto);
    }


    /* 댓글 작업 part*/
//    @PostMapping("/comment/create")
//    public ResponseEntity<ArticleDto> getDetailById(@PathVariable int articleId) {
//        return ResponseEntity.status(HttpStatus.OK).body();
//    }

//    @PutMapping("/comment/update")
//    public ResponseEntity<ArticleDto> getDetailById(@PathVariable int articleId) {
//        return ResponseEntity.status(HttpStatus.OK).body();
//    }


//    @DeleteMapping("/comment/delete/{commentId}")
//    public ResponseEntity<ArticleDto> getDetailById(@PathVariable int articleId) {
//        return ResponseEntity.status(HttpStatus.OK).body();
//    }
}
