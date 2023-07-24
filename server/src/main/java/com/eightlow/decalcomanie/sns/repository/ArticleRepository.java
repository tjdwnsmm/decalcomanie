package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
//    boolean existsById(int articleId);
    Article findByArticleId(int articleId);

}
