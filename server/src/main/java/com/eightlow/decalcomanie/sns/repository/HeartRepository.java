package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.Heart;
import com.eightlow.decalcomanie.sns.entity.pk.HeartPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, HeartPk> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM Heart h WHERE h.article.articleId = :articleId AND h.user.userId LIKE :userId")
    void deleteByArticleIdAndUserId(@Param("articleId") int articleId, @Param("userId") String userId);


    Optional<Heart> findByArticle_ArticleIdAndUser_UserId(int articleId, String userId);
}
