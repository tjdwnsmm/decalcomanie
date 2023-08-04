package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
//    boolean existsById(int articleId);
    Optional<Article> findByArticleId(int articleId);

    @Query("SELECT a  FROM Article a WHERE a.userId = :userId ORDER BY a.createdAt DESC")
    List<Article> findByUserId(@Param(value = "userId") String userId);

    @Query("SELECT a  FROM Article a ORDER BY a.heart DESC")
    @Transactional
    List<Article> findArticlesOrderByHeart();

    @Query("SELECT a FROM Article a ORDER BY a.createdAt DESC")
    @Transactional
    List<Article> findArticlesOrderByCreateTime();

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE Article a SET a.comment = a.comment + 1 WHERE a.articleId = :articleId")
    void increaseCommentCount(@Param("articleId") int articleId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE Article a SET a.comment = a.comment - 1 WHERE a.articleId = :articleId")
    void decreaseCommentCount(@Param("articleId") int articleId);

    @Modifying
    @Transactional
    @Query("UPDATE Article a SET a.heart = a.heart + 1 WHERE a.articleId = :articleId")
    void increaseHeartCountByArticleId(@Param("articleId") int articleId);

    @Modifying
    @Transactional
    @Query("UPDATE Article a SET a.heart = a.heart - 1 WHERE a.articleId = :articleId")
    void decreaseHeartCountByArticleId(@Param("articleId") int articleId);
}
