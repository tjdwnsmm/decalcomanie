package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
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

    @Modifying
    @Query("DELETE FROM ArticlePerfume WHERE articleId = :articleId")
    void deleteAllByArticleId(@Param(value = "articleId") int articleId);
}
