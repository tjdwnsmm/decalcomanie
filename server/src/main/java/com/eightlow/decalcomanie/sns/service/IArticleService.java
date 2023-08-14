package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.BookMarkDto;
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.HeartDto;
import com.eightlow.decalcomanie.sns.dto.request.FeedInquiryRequest;
import com.eightlow.decalcomanie.sns.dto.response.ArticleResponse;
import com.eightlow.decalcomanie.sns.dto.response.FeedResponse;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import com.eightlow.decalcomanie.sns.entity.Comment;
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

    ArticleResponse getDetail(int articleId, String userId);

    Article searchArticleByArticleId(int articleId);
    List<Article> searchArticlesOfFollowingUser(FeedInquiryRequest feedInquiryRequest, String userId);
    List<FeedResponse> getArticlesOfFollowingUser(FeedInquiryRequest feedInquiryRequest, String userId);
    List<Article> searchPopularArticles(FeedInquiryRequest feedInquiryRequest);
    List<FeedResponse> getPopularArticles(FeedInquiryRequest feedInquiryRequest, String userId);
    List<Article> searchLatestArticles(FeedInquiryRequest feedInquiryRequest);
    List<FeedResponse> getLatestArticles(FeedInquiryRequest feedInquiryRequest, String userId);
    List<Article> searchArticleByUserId(String userId);
    List<FeedResponse> getArticleByUserId(String userId);
    List<Article> searchArticleByPerfumeId(int perfumeId);
    List<FeedResponse> getArticleByPerfumeId(String userId, int perfumeId);

    List<ArticlePerfume> searchArticlePerfumeId(int articleId);

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
