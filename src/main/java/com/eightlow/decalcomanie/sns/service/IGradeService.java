package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.GradeDto;

import java.util.List;

public interface IGradeService {
    void createGrade(GradeDto gradeDto);

//    List<GradeDto> searchGradesByArticle(ArticleDto article);
    void createOrModifyGradeFromRequest(String userId, List<Integer> perfumes, List<Integer> rates);

    List<GradeDto> searchGradesByPerfumeId(String userId, List<Integer> perfumeIdList);

    void deleteGradesByUserIdAndPerfumeId(String userId, List<Integer> perfumeIdList);
}
