package com.eightlow.decalcomanie.sns.service;

import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;

import java.util.List;

public interface IGradeService {
    void createGradeFromRequest(int articleId, List<Integer> perfumes, List<Integer> rates);

    void modifyGradeFromRequest(int articleId, List<Integer> perfumes, List<Integer> rates);
    List<ArticlePerfumeDto> searchGradesByPerfumeId(int articleId, List<Integer> perfumeIdList);

    // void deleteGradesByUserIdAndPerfumeId(String userId, int articleId,List<Integer> perfumeIdList);
}
