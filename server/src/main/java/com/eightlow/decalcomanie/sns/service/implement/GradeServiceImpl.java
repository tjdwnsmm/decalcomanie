package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.entity.Grade;
import com.eightlow.decalcomanie.sns.mapper.GradeMapper;
import com.eightlow.decalcomanie.sns.repository.GradeRepository;
import com.eightlow.decalcomanie.sns.service.IGradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class GradeServiceImpl implements IGradeService {

    private final GradeRepository gradeRepository;
    private final GradeMapper gradeMapper;

    @Override
    @Transactional
    public void createGrade(GradeDto gradeDto) {
        log.info("GradeServiceImpl::: createGrade start");
        Grade grade = gradeRepository.save(gradeMapper.toEntity(gradeDto));
        log.info("GradeServiceImpl::: finish ");
    }



//    @Override
//    @Transactional
//    public List<GradeDto> searchGradesByArticle(ArticleDto article) {
//        log.info("GradeServiceImpl::: searchGradesByArticle start");
//        List<Grade> grades = gradeRepository.findGradeByGradePkUserIdAndGradePkArticleId(article.getUserId(), article.get);
////        return gradeMapper.toDto(grades);
//        return null;
//    }

    @Override
    @Transactional
    public void createOrModifyGradeFromRequest(String userId, List<Integer> perfumes, List<Integer> rates) {
        // 여러개의 향수를 임베디드하고 평점을 남긴경우 Grade 테이블에 데이터를 저장하기 위함
        for (int i = 0; i < perfumes.size(); i++) {
            GradeDto gradeDto = new GradeDto(userId, perfumes.get(i), rates.get(i));
            createGrade(gradeDto);
        }
    }

    @Override
    public List<GradeDto> searchGradesByPerfumeId(String userId, List<Integer> perfumeIdList) {

        log.info("GradeServiceImpl::: searchGradesByPerfumeId start");
        List<Grade> grades = new ArrayList<>();
        for (int i = 0; i < perfumeIdList.size(); i++) {
            grades.add(gradeRepository.findByUserIdAndPerfumeId(userId, perfumeIdList.get(i)));
        }
        log.info("GradeServiceImpl::: searchGradesByPerfumeId end");
        return gradeMapper.toDto(grades);
    }


}
