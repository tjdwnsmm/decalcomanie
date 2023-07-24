package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlePerfumeRepository extends JpaRepository <ArticlePerfume, Integer>{
    List<ArticlePerfume> findByArticleId(int articleId);
}
