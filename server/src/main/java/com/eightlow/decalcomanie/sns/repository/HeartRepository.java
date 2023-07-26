package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.Heart;
import com.eightlow.decalcomanie.sns.entity.pk.HeartPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, HeartPk> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Heart WHERE articleId = :articleId AND userId = :userId")
    void deleteByArticleIdAndUserId(int articleId, String userId);
}
