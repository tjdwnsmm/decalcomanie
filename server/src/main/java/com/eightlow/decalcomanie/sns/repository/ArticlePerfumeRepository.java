package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlePerfumeRepository extends JpaRepository <ArticlePerfume, Integer>{
    List<ArticlePerfume> findByArticleId(int articleId);
    List<ArticlePerfume> findByPerfumeId(int perfumeId);

    List<ArticlePerfume> findByArticleIdAndPerfumeIdIn(int articleId, List<Integer> perfumeId);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE ArticlePerfume ap SET ap.rate = :rate WHERE ap.articleId = :articleId AND ap.perfumeId = :perfumeId")
    void updateRateByArticleIdAndPerfumeId(@Param(value = "articleId") int articleId,
                                           @Param(value = "perfumeId") int perfumeId,
                                           @Param(value = "rate") int rate);

//    void deleteByUserIdAndArticleIdAndPerfumeIdIn(String userId, int articleId, List<Integer> perfumeIdList);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM ArticlePerfume WHERE articleId = :articleId")
    void deleteAllByArticleId(@Param(value = "articleId") int articleId);
}
