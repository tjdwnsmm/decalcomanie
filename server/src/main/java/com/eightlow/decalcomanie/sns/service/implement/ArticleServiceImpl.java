package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import com.eightlow.decalcomanie.sns.mapper.ArticleMapper;
import com.eightlow.decalcomanie.sns.mapper.ArticlePerfumeMapper;
import com.eightlow.decalcomanie.sns.repository.ArticlePerfumeRepository;
import com.eightlow.decalcomanie.sns.repository.ArticleRepository;
import com.eightlow.decalcomanie.sns.service.IArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ArticleServiceImpl implements IArticleService {

    private final ArticleRepository articleRepository;
    private final ArticlePerfumeRepository articlePerfumeRepository;
    private final ArticleMapper articleMapper;
    private final ArticlePerfumeMapper articlePerfumeMapper;

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
    public void updateArticle(ArticleDto articleDto) {
        log.info("ArticleServiceImpl::: updateArticle start");
        Article article = articleRepository.save(articleMapper.toEntity(articleDto));
        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
    }

    @Override
    @Transactional
    public void deleteArticle(int articleId) {
        log.info("ArticleServiceImpl::: deleteArticle start");
        articleRepository.deleteById(articleId);
//        log.info("ArticleServiceImpl::: finish ", String.valueOf(article.getArticleId()));
    }

    @Override
    @Transactional
    public void createArticlePerfume(int articleId, List<Integer> perfumes) {
        log.info("ArticleServiceImpl::: createArticlePerfume start");
        for (int i = 0; i < perfumes.size(); i++) {
            ArticlePerfumeDto articlePerfumeDto = new ArticlePerfumeDto(articleId, perfumes.get(i));
            articlePerfumeRepository.save(articlePerfumeMapper.toEntity(articlePerfumeDto));
        }
        log.info("ArticleServiceImpl::: finish ");
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

    @Override
    @Transactional
    public List<Integer> searchArticlePerfumeId(int articleId) {
        log.info("ArticleServiceImpl::: searchArticlePerfumeId start");
        List<ArticlePerfume> articlePerfumes = articlePerfumeRepository.findByArticleId(articleId);
        List<Integer> perfumes = new ArrayList<>();
        for(ArticlePerfume perfume : articlePerfumes) {
            perfumes.add(perfume.getPerfumeId());
        }
        log.info("ArticleServiceImpl::: finish ", String.valueOf(perfumes));
        return perfumes;
    }

}
