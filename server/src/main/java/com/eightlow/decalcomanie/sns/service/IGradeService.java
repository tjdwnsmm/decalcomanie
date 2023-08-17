package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;

import java.util.List;

public interface IGradeService {
    void createGradeFromRequest(int articleId, List<Integer> perfumes, List<Float> rates);

    void modifyGradeFromRequest(int articleId, List<Integer> perfumes, List<Float> rates);
}
