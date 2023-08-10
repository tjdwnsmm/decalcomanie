package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.BookMarkDto;
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.HeartDto;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import org.springframework.http.ResponseEntity;


import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

public interface IArticleService {
    /*
            글(피드) 부분
     */
    boolean existArticleById(int id);
    int createArticle(ArticleDto articleDto);
//    void createArticlePerfume(int articleId, List<Integer> perfumes);

    int updateArticle(ArticleDto articleDto, String userId);

    int deleteArticle(String userId, int articleId);
    void deleteArticlePerfumeByArticleId(int articleId);

    ArticleDto searchArticleByArticleId(int articleId);
    List<ArticleDto> searchArticlesOfFollowingUser(String userId);
    List<ArticleDto> searchPopularArticles();
    List<ArticleDto> searchLatestArticles();
    List<ArticleDto> searchArticleByUserId(String userId);
    List<ArticleDto> searchArticleByPerfumeId(int perfumeId);

    List<Integer> searchArticlePerfumeId(int articleId);

    /*
            댓글 파트
     */
    void createComment(CommentDto commentDto);
    ResponseEntity<Response> updateComment(CommentDto commentDto);
    int deleteComment(int commentId, String userId);
    void increaseCommentCount(int articleId);

    void decreaseCommentCount(int articleId);

    List<CommentDto> getComments(int articleId);

    int deleteCommentByArticleId(int articleId);

    int likeArticle(HeartDto heartDto);

    int dislikeArticle(HeartDto heartDto);

    int bookmarkArticle(BookMarkDto bookmarkDto);

    int cancelBookmarkArticle(BookMarkDto bookmarkDto);

    boolean checkHeartArticle(int articleId, String userId);

    boolean checkBookmarkArticle(int articleId, String userId);


    String getUserIdFromRequest(HttpServletRequest request);
}
