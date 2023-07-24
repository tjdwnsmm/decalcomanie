package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface IArticleService {
    boolean existArticleById(int id);
    int createArticle(ArticleDto articleDto);
    void updateArticle(ArticleDto articleDto);
    void deleteArticle(int id);
    void createArticlePerfume(int articleId, List<Integer> perfumes);
    ArticleDto searchArticleByArticleId(int articleId);
    List<ArticleDto> searchArticleByUserId(UUID userId);
    List<ArticleDto> searchArticleByPerfumeId(UUID userId);

    List<Integer> searchArticlePerfumeId(int articleId);
}
