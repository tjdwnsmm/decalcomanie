package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.entity.Article;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-21T08:56:58+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class ArticleMapperImpl implements ArticleMapper {

    @Override
    public Article toEntity(ArticleDto articleDto) {
        if ( articleDto == null ) {
            return null;
        }

        Article.ArticleBuilder<?, ?> article = Article.builder();

        article.createdAt( articleDto.getCreatedAt() );
        article.updatedAt( articleDto.getUpdatedAt() );
        article.articleId( articleDto.getArticleId() );
        article.userId( articleDto.getUserId() );
        article.content( articleDto.getContent() );
        article.heart( articleDto.getHeart() );
        article.comment( articleDto.getComment() );

        return article.build();
    }

    @Override
    public ArticleDto toDto(Article article) {
        if ( article == null ) {
            return null;
        }

        ArticleDto.ArticleDtoBuilder<?, ?> articleDto = ArticleDto.builder();

        articleDto.createdAt( article.getCreatedAt() );
        articleDto.updatedAt( article.getUpdatedAt() );
        articleDto.articleId( article.getArticleId() );
        articleDto.userId( article.getUserId() );
        articleDto.content( article.getContent() );
        articleDto.heart( article.getHeart() );
        articleDto.comment( article.getComment() );

        return articleDto.build();
    }
}
