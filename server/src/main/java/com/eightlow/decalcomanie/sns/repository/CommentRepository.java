package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Optional<Comment> findByArticleIdAndCommentId(int articleId, int commentId);

    void deleteByArticleIdAndCommentId(int articleId, int commentId);

    List<Comment> findByArticleId(int articleId);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Comment WHERE articleId = :articleId")
    void deleteAllByArticleId(@Param("articleId") int articleId);
}
