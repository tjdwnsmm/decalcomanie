package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.repository.PerfumeRepository;
import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import com.eightlow.decalcomanie.sns.mapper.ArticlePerfumeMapper;
import com.eightlow.decalcomanie.sns.repository.ArticlePerfumeRepository;
import com.eightlow.decalcomanie.sns.repository.ArticleRepository;
import com.eightlow.decalcomanie.sns.service.IGradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class GradeServiceImpl implements IGradeService {

    private final ArticlePerfumeRepository articlePerfumeRepository;
    private final ArticleRepository articleRepository;
    private final PerfumeRepository perfumeRepository;
    private final ArticlePerfumeMapper articlePerfumeMapper;

    private final EntityManager entityManager;

    @Override
    @Transactional
    public void createGradeFromRequest(int articleId, List<Integer> perfumes, List<Float> rates) {
        // ArticlePerfume 테이블에 정보 저장 
        for (int i = 0; i < perfumes.size(); i++) {
//            ArticlePerfumeDto articlePerfumeDto = new ArticlePerfumeDto(articleId, perfumes.get(i), rates.get(i));
//            ArticlePerfume articlePerfume = articlePerfumeMapper.toEntity(articlePerfumeDto);
            // TODO: 이 부분이 select로 데이터를 많이 가져옴 (개선 가능성 있음)
            Article article = entityManager.find(Article.class, articleId);
            Perfume perfume = entityManager.find(Perfume.class, perfumes.get(i));
//            Article article = articleRepository.findByArticleId(articleId).orElse(null);
//            Perfume perfume = perfumeRepository.findByPerfumeId(perfumes.get(i)).orElse(null);

            ArticlePerfume articlePerfume = ArticlePerfume.builder()
                    .article(article)
                    .perfume(perfume)
                    .rate(rates.get(i))
                    .build();
            System.out.println(articlePerfume.getArticle().getArticleId());
            articlePerfumeRepository.save(articlePerfume);
        }
    }

    @Override
    @Transactional
    public void modifyGradeFromRequest(int articleId, List<Integer> perfumes, List<Float> rates) {
        // ArticlePerfume의 rate 정보 수정
        for (int i = 0; i < perfumes.size(); i++) {
            articlePerfumeRepository.updateRateByArticleIdAndPerfumeId(articleId, perfumes.get(i), rates.get(i));
        }
    }

    @Override
    @Transactional
    public List<ArticlePerfumeDto> searchGradesByPerfumeId(int articleId, List<Integer> perfumeIdList) {

        log.info("GradeServiceImpl::: searchGradesByPerfumeId start");
        List<ArticlePerfume> grades = new ArrayList<>();
        Article article = entityManager.find(Article.class, articleId);
        grades = articlePerfumeRepository.findByArticle_ArticleIdAndPerfume_PerfumeIdIn(article.getArticleId(), perfumeIdList);
//        for (int i = 0; i < perfumeIdList.size(); i++) {
//            grades.add(articlePerfumeRepository.findByArticleIdAndPerfumeIdIn(articleId, perfumeIdList.get(i)));
//        }
        log.info("GradeServiceImpl::: searchGradesByPerfumeId end");
        return articlePerfumeMapper.toDto(grades);
    }

//    @Override
//    @Transactional
//    public void deleteGradesByUserIdAndPerfumeId(String userId, int articleId, List<Integer> perfumeIdList) {
//        log.info("GradeServiceImpl::: deleteGradesByUserIdAndPerfumeId start");
//
//        // userId와 articleId가 일치하면서 perfumeIdList를 포함하는걸 삭제
//        articlePerfumeRepository.deleteByUserIdAndArticleIdAndPerfumeIdIn(userId, articleId, perfumeIdList);
//        // 하나의 사용자가 여라개의 게시물을 게시하더라도 한개의 향수에대해선 하나의 평점만 게시할 수 있다고 했을때 삭제방식
////        for (Integer perfumeId : perfumeIdList) {
////            gradeRepository.deleteByUserIdAndPerf
// umeId(userId, perfumeId);
////        }
//
//        log.info("GradeServiceImpl::: deleteGradesByUserIdAndPerfumeId end");
//    }
}
