package com.eightlow.decalcomanie.sns.controller;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.mapper.PerfumeMapper;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.eightlow.decalcomanie.sns.dto.*;
import com.eightlow.decalcomanie.sns.dto.request.CommentRequest;
import com.eightlow.decalcomanie.sns.dto.request.CreateArticleRequest;
import com.eightlow.decalcomanie.sns.dto.request.UpdateArticleRequest;
import com.eightlow.decalcomanie.sns.dto.response.ArticleResponse;
import com.eightlow.decalcomanie.sns.dto.response.FeedResponse;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.sns.mapper.ArticleDtoMapper;
import com.eightlow.decalcomanie.sns.mapper.CommentDtoMapper;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import com.eightlow.decalcomanie.sns.service.IGradeService;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.mapper.FollowMapper;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/sns")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@Slf4j
public class ArticleController {
    private final IArticleService articleService;
    private final IGradeService gradeService;
    private final IPerfumeService perfumeService;
    private final IUserService userService;

    private final ArticleDtoMapper articleDtoMapper;
    private final CommentDtoMapper commentDtoMapper;
    private final FollowMapper followMapper;
    private final PerfumeMapper perfumeMapper;

    // 글 작성
    @PostMapping("/create")
    public ResponseEntity<Response> createArticle(@RequestBody @Valid CreateArticleRequest createArticleRequest, HttpServletRequest req) {
        ArticleDto articleDto = articleDtoMapper.fromCreateArticleRequest(createArticleRequest);
        int articleId = articleService.createArticle(articleDto);

        // grade테이블에도 향수에대한 평가 넣어주기
        gradeService.createOrModifyGradeFromRequest(createArticleRequest.getUserId(),
                createArticleRequest.getPerfumeId(), createArticleRequest.getRate());
        
        // 게시물에 임베디드된 향수들을 테이블에 저장
        articleService.createArticlePerfume(articleId, createArticleRequest.getPerfumeId());

        //TODO
        // 평점 등록시 perfume테이블의 평점 수정!!!
        // grade 테이블을 통해서 평균을 내준다 (perfume id 갯수 카운트, rate 더하기 로)
        // perfume service 호출해서 값을 넣어준다.


        return ResponseEntity.status(HttpStatus.OK)
                .body(Response.builder()
                        .message("글이 정상 등록되었습니다.")
                        .build());
    }


    // 글 상세 조회 
    @GetMapping("/search/{articleId}")
    public ResponseEntity<ArticleResponse> getDetailById(@RequestHeader(value = "userId") String userId, @PathVariable int articleId, HttpServletRequest req) {
        ArticleDto articleDto = articleService.searchArticleByArticleId(articleId);
        System.out.println(articleDto.getUserId());

        //articleId를 통해서 게시물의 임베디드된 향수를 가져온다.
        List<Integer> perfumeIdList = articleService.searchArticlePerfumeId(articleId);
        log.info(perfumeIdList.toString());

        // 작성자: 프로필, 닉네임, 선호 비선호향
        UserInfoDto userInfo = userService.getUserInfo(articleDto.getUserId());
        System.out.println(userInfo);

        // 향수들의 평점도 가져온다
        List<GradeDto> rates = gradeService.searchGradesByPerfumeId(articleDto.getUserId(), perfumeIdList);
        log.info(rates.toString());

        // 임베디드된 향수: 이름, 브랜드, 향수 사진 url
        List<PerfumeDto> perfumes = new ArrayList<>();
        for(int i: perfumeIdList) {
            perfumes.add(perfumeService.getPerfume(i));
        }

        // 댓글 리스트를 포함한다.
        List<CommentDto> comments = articleService.getComments(articleDto.getArticleId());
        System.out.println(comments);

        //사용자의 팔로우 목록을 받아온다.
        List<FollowingResponse> followerInfoResponses = userService.getFollowingUsers(userId);
        System.out.println("tjoejtoijfilsjlfjs;dlj");
        System.out.println(followerInfoResponses);

        List<UserInfoDto> commentUsers = new ArrayList<>();

        // 댓글 작성자정보들
        for (CommentDto commentDto : comments) {
            UserInfoDto userInfoDto = null;
            // 사용자의 follower 목록을 보고 follow 여부를 넣어준다.
            for (FollowingResponse followerInfoResponse : followerInfoResponses) {
                if(followerInfoResponse.getUserId().equals(commentDto.getUserId())) {
                    System.out.println("inininininin");
                    userInfoDto = userService.getUserInfo(commentDto.getUserId());
                    System.out.println(userInfoDto);

                    commentUsers.add(new UserInfoDto(userInfoDto.getUser(), userInfoDto.getFavorities(),
                            userInfoDto.getHates(), true));

                    break;
                }
                commentUsers.add(new UserInfoDto(userInfoDto.getUser(), userInfoDto.getFavorities(),
                        userInfoDto.getHates(), false));


            }

        }

        // 좋아요 되었는지 확인
        boolean isHearted = articleService.checkHeartArticle(articleDto.getArticleId(), userId);

        // 북마크 되었는지 확인
        boolean isBookmarked = articleService.checkBookmarkArticle(articleDto.getArticleId(), userId);

        ArticleResponse articleResponse = new ArticleResponse(articleDto,  userInfo, comments, commentUsers,
                perfumes, rates, isHearted, isBookmarked);

        System.out.println(articleResponse);
        return ResponseEntity.status(HttpStatus.OK).body(articleResponse);
    }

    /*
        피드(글) 조회 부분
     */

    // 사용자가 쓴 글을 조회(내가 쓴글 조회)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedResponse>> getArticleByUserId(@PathVariable String userId, HttpServletRequest req) {
        System.out.println(userId);
        List<ArticleDto> articles = articleService.searchArticleByUserId(userId);
        System.out.println(articles);

        List<FeedResponse> responses  = getFeedInfoForArticles(userId, articles);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    // 팔로워의 피드를 조희
    @GetMapping("/feed/following")
    public ResponseEntity<List<FeedResponse>> getFollowingArticles(@RequestHeader(value = "userId") String userId, HttpServletRequest req) {

        // TODO: 사용자의 follower list를 받아와서 그 사용자들의 피드를 조회해야함 (정렬은 최신순으로)
        List<ArticleDto> articles = articleService.searchArticlesOfFollowingUser(userId);
        log.info(articles.toString());
        List<FeedResponse> responses  = getFeedInfoForArticles(userId, articles);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/feed/popularity")
    public ResponseEntity<List<FeedResponse>> getPopularArticles(@RequestHeader(value = "userId") String userId, HttpServletRequest req) {
        List<ArticleDto> articles= articleService.searchPopularArticles();

        List<FeedResponse> responses  = getFeedInfoForArticles(userId, articles);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/feed/latest")
    public ResponseEntity<List<FeedResponse>> getLatestArticles(@RequestHeader(value = "userId") String userId, HttpServletRequest req) {
        List<ArticleDto> articles= articleService.searchLatestArticles();
        log.info(articles.toString());

        List<FeedResponse> responses  = getFeedInfoForArticles(userId, articles);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    // 향수별 피드 조회
    @GetMapping("/perfume/{perfumeId}")
    public ResponseEntity<List<FeedResponse>> getPerfumeArticles(@RequestHeader(value = "userId") String userId, @PathVariable int perfumeId, HttpServletRequest req) {
        List<ArticleDto> articles= articleService.searchArticleByPerfumeId(perfumeId);
        log.info(articles.toString());
        List<FeedResponse> responses  = getFeedInfoForArticles(userId, articles);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    // 조회 파트 끝

    // 글 수정
    @PutMapping("/update")
    public ResponseEntity<Response> modifyArticle(@RequestBody @Valid
                                                        UpdateArticleRequest updateArticleRequest, HttpServletRequest req) {
        ArticleDto articleDto = articleDtoMapper.fromUpdateArticleRequest(updateArticleRequest);
        int status = articleService.updateArticle(articleDto);

        // 글 수정이 성공 한 경우
        if(status == 200) {
            // 향수 평가도 수정
            // TODO: 원래 향수 리스트와 새로 받은 리스트를 확인하거나, 아니면 아얘 peerfumeList를 받지 않거나 둘중 하나 해야함
            gradeService.createOrModifyGradeFromRequest(updateArticleRequest.getUserId(),
                    updateArticleRequest.getPerfumeId(), updateArticleRequest.getRate());
        }

        // 수정 된걸 보여주는건 프런트 단에서 다시 get을 보내주는것이 맞는것 같다!!
        return resultMessage(status);
    }

    //글 삭제
    @DeleteMapping("/delete/{articleId}")
    public ResponseEntity<Response> deleteArticle(@RequestHeader(value = "userId") String userId, @PathVariable int articleId, HttpServletRequest req) {
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
    // 댓글 작성
    @PostMapping("/comment/create")
    public ResponseEntity<Response> createComment(@RequestBody CommentRequest commentRequest, HttpServletRequest req) {
        CommentDto commentDto = commentDtoMapper.fromCommentRequest(commentRequest);
        articleService.createComment(commentDto);
//        return ResponseEntity.status(HttpStatus.OK).body();
        return ResponseEntity.status(HttpStatus.OK)
                .body(Response.builder()
                        .message("댓글이 정상 등록되었습니다.")
                        .build());
    }

    // 댓글 수정
    @PutMapping("/comment/update")
    public ResponseEntity<Response> updateComment(@RequestBody CommentRequest commentRequest, HttpServletRequest req) {
        CommentDto commentDto = commentDtoMapper.fromCommentRequest(commentRequest);
        System.out.println(commentDto);
        ResponseEntity<Response> response = articleService.updateComment(commentDto);
        return response;
//        return null;
//        return ResponseEntity.status(HttpStatus.OK).body();
    }

    // 댓글 삭제
    @DeleteMapping("/comment/delete/{commentId}")
    public ResponseEntity<Response> deleteComment(@RequestBody CommentRequest commentRequest, HttpServletRequest req) {
        CommentDto commentDto = commentDtoMapper.fromCommentRequest(commentRequest);
        System.out.println(commentDto);
        // 댓글 삭제
        int statusCode = articleService.deleteComment(commentDto);

        // 댓글 삭제시 article 테이블의 comment의 갯수를 줄여준다
        articleService.modifyCommentCount(commentDto.getArticleId());

        return resultMessage(statusCode);
    }


    /* 피드 좋아요, 북마크 기능 파트*/

    @PostMapping("/like")
    public ResponseEntity<Response> likeArticle(@RequestBody HeartDto heartDto, HttpServletRequest req) {
        int status = articleService.likeArticle(heartDto);
        return resultMessage(status);
    }

    @PostMapping("/dislike")
    public ResponseEntity<Response> dislikeArticle(@RequestBody HeartDto heartDto, HttpServletRequest req) {
        int status = articleService.dislikeArticle(heartDto);
        return resultMessage(status);
    }

    @PostMapping("/bookmark")
    public ResponseEntity<Response> bookmarkArticle(@RequestBody BookMarkDto bookmarkDto, HttpServletRequest req) {
        int status = articleService.bookmarkArticle(bookmarkDto);
        return resultMessage(status);
    }

    @PostMapping("/cancelBookmark")
    public ResponseEntity<Response> cancelBookmarkedArticle(@RequestBody BookMarkDto bookmarkDto, HttpServletRequest req) {
        int status = articleService.cancelBookmarkArticle(bookmarkDto);
        return resultMessage(status);
    }
    
    // response 메세지를 만들어주는 공통 메서드 
    private ResponseEntity<Response> resultMessage(int status) {
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
    
    // 피드 정보 조회 (사용자 정보, 글 정보, 포함된 향수 정보를 포함)
    private List<FeedResponse> getFeedInfoForArticles(String userId, List<ArticleDto> articles){
        // 각 article에 담긴 사용자 정보와 향수 정보를 담아둔 Dto의 리스트
        List<FeedResponse> feedResponses = new ArrayList<>();

        // articleId를 보고 사용자 정보와 향수 정보를 담음
        for(ArticleDto article: articles){
            // TODO: perfumeId가 하나만 필요함으로 추후 쿼리 최적화가 필요!!
            List<Integer> perfumeIdList = articleService.searchArticlePerfumeId(article.getArticleId());
            System.out.println(perfumeIdList);
            log.info(perfumeIdList.toString());
            // TODO: 공병 태그 (아마 perfumeId 0번 ), 즉 향수가 아무것도 임베디드 안된 상황을 구현 헤야함!!

            UserInfoDto userInfoDto = userService.getUserInfo(article.getUserId());

            //사용자의 팔로우 목록을 받아온다.
            List<FollowingResponse> followerInfoResponses = userService.getFollowingUsers(userId);
            boolean isFollowed = false;
            for (FollowingResponse followerInfoResponse : followerInfoResponses) {
                if (followerInfoResponse.getUserId().equals(userInfoDto.getUser().getUserId())) {
                    isFollowed = true;
                    break;
                }
            }
            
            // 하나만 필요함으로 get(0)을 수행함
            PerfumeDto perfumeDto = perfumeService.getPerfume(perfumeIdList.get(0));
            log.info(String.valueOf(perfumeDto));

            boolean isHearted = articleService.checkHeartArticle(article.getArticleId(), userId);
            boolean isBookmarked = articleService.checkBookmarkArticle(article.getArticleId(), userId);

            feedResponses.add(new FeedResponse(userInfoDto, isFollowed, article, perfumeDto, isHearted, isBookmarked));
        }
        return feedResponses;
    }
}
