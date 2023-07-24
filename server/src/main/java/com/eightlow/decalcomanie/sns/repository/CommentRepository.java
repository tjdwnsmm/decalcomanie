package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.Comment;
import com.eightlow.decalcomanie.sns.entity.pk.CommentPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, CommentPk> {
    Optional<Comment> findByArticleIdAndCommentId(int articleId, int commentId);
}
