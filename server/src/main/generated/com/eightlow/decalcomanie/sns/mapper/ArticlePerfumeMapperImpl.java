package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-24T17:30:55+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class ArticlePerfumeMapperImpl implements ArticlePerfumeMapper {

    @Override
    public ArticlePerfume toEntity(ArticlePerfumeDto articlePerfumeDto) {
        if ( articlePerfumeDto == null ) {
            return null;
        }

        ArticlePerfume.ArticlePerfumeBuilder articlePerfume = ArticlePerfume.builder();

        articlePerfume.articleId( articlePerfumeDto.getArticleId() );
        articlePerfume.perfumeId( articlePerfumeDto.getPerfumeId() );

        return articlePerfume.build();
    }

    @Override
    public ArticlePerfumeDto toDto(ArticlePerfume articlePerfume) {
        if ( articlePerfume == null ) {
            return null;
        }

        ArticlePerfumeDto.ArticlePerfumeDtoBuilder<?, ?> articlePerfumeDto = ArticlePerfumeDto.builder();

        articlePerfumeDto.articleId( articlePerfume.getArticleId() );
        articlePerfumeDto.perfumeId( articlePerfume.getPerfumeId() );

        return articlePerfumeDto.build();
    }
}
