package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;

import java.util.List;
import java.util.UUID;

public interface IGradeService {
    void createGrade(GradeDto gradeDto);

    void createOrModifyGradeFromRequest(String userId, List<Integer> perfumes, List<Integer> rates);
}
