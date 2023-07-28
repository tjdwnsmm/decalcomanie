package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.BookMark;
import com.eightlow.decalcomanie.sns.entity.pk.BookMarkPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, BookMarkPk> {

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM BookMark b WHERE b.articleId = :articleId AND b.userId LIKE :userId")
    void deleteByArticleIdAndUserId(@Param("articleId") int articleId, @Param("userId") String userId);
}
