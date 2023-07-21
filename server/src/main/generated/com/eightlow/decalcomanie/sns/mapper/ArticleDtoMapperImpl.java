package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.request.CreateArticleRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-21T12:50:03+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class ArticleDtoMapperImpl implements ArticleDtoMapper {

    @Override
    public ArticleDto fromCreateArticleRequest(CreateArticleRequest createArticleRequest) {
        if ( createArticleRequest == null ) {
            return null;
        }

        ArticleDto.ArticleDtoBuilder<?, ?> articleDto = ArticleDto.builder();

        articleDto.articleId( createArticleRequest.getArticleId() );
        articleDto.userId( createArticleRequest.getUserId() );
        articleDto.content( createArticleRequest.getContent() );

        return articleDto.build();
    }
}
