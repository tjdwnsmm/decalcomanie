package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.sns.mapper.ArticleMapper;
import com.eightlow.decalcomanie.sns.repository.ArticleRepository;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ArticleServiceImpl implements IArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    @Override
    public boolean existArticleById(int id) {
        return false;
    }

    @Override
    @Transactional
    public void createArticle(ArticleDto articleDto) {
        log.info("ArticleServiceImpl::: createArticle start");
        Article article = articleRepository.save(articleMapper.toEntity(articleDto));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
    }

    @Override
    @Transactional
    public void updateArticle(ArticleDto articleDto) {
        log.info("ArticleServiceImpl::: updateArticle start");
        Article article = articleRepository.save(articleMapper.toEntity(articleDto));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
    }

    @Override
    public void deleteArticle(int articleId) {
        log.info("ArticleServiceImpl::: deleteArticle start");
//        Article article = articleRepository.save(articleMapper.toEntity(articleDto));
//        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
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

}
