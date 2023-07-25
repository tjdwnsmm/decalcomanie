package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import org.springframework.http.ResponseEntity;


import java.util.List;
import java.util.UUID;

public interface IArticleService {
    /*
            글(피드) 부분
     */
    boolean existArticleById(int id);
    int createArticle(ArticleDto articleDto);
    int updateArticle(ArticleDto articleDto);
    int deleteArticle(String userId, int articleId);
    void createArticlePerfume(int articleId, List<Integer> perfumes);
    ArticleDto searchArticleByArticleId(int articleId);
    List<ArticleDto> searchArticleByUserId(UUID userId);
    List<ArticleDto> searchArticleByPerfumeId(UUID userId);

    List<Integer> searchArticlePerfumeId(int articleId);

    /*
            댓글 파트
     */
    void createComment(CommentDto commentDto);
    ResponseEntity<Response> updateComment(CommentDto commentDto);
    int deleteComment(CommentDto commentDto);
    void modifyCommentCount(int articleId);

    List<CommentDto> getComments(int articleId);

    int deleteCommentByArticleId(int articleId);

    void deleteArticlePerfumeByArticleId(int articleId);
}
