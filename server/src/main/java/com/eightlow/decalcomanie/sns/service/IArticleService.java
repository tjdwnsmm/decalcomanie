package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface IArticleService {
    boolean existArticleById(int id);
    void createArticle(ArticleDto articleDto);
    void updateArticle(ArticleDto articleDto);
    void deleteArticle(int id);

    ArticleDto searchArticleByArticleId(int articleId);
    List<ArticleDto> searchArticleByUserId(UUID userId);
    List<ArticleDto> searchArticleByPerfumeId(UUID userId);
}
