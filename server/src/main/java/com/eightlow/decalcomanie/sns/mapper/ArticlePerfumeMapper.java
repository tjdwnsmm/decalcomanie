package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;

import com.eightlow.decalcomanie.sns.entity.ArticlePerfume;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticlePerfumeMapper {
    ArticlePerfume toEntity(ArticlePerfumeDto articlePerfumeDto);

    ArticlePerfumeDto toDto(ArticlePerfume articlePerfume);


    List<ArticlePerfume> toEntity(List<ArticlePerfumeDto> articlePerfumeDto);
    List<ArticlePerfumeDto> toDto(List<ArticlePerfume> articlePerfume);
}
