package com.eightlow.decalcomanie.sns.mapper;


import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.dto.request.CreateArticleRequest;
import com.eightlow.decalcomanie.sns.entity.Grade;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GradeMapper {
    Grade toEntity(GradeDto gradeDto);
    GradeDto toDto(Grade grade);

    List<Grade> toEntity(List<GradeDto> gradeDtoList);
    List<GradeDto> toDto(List<Grade> gradeList);
}
