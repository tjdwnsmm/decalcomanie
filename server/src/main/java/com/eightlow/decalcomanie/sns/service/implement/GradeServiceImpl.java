package com.eightlow.decalcomanie.sns.service.implement;

import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.sns.entity.Grade;
import com.eightlow.decalcomanie.sns.mapper.GradeMapper;
import com.eightlow.decalcomanie.sns.repository.GradeRepository;
import com.eightlow.decalcomanie.sns.service.IGradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        log.info("GradeServiceImpl::: finish ", String.valueOf(grade.getRate()), String.valueOf(grade.getPerfumeId()));
    }

    @Override
    @Transactional
    public void createOrModifyGradeFromRequest(String userId, List<Integer> perfumes, List<Integer> rates) {
        // 여러개의 향수를 임베디드하고 평점을 남긴경우 Grade 테이블에 데이터를 저장하기 위함
        for (int i = 0; i < perfumes.size(); i++) {
            GradeDto gradeDto = new GradeDto(userId, perfumes.get(i), rates.get(i));
            createGrade(gradeDto);
        }
    }


}
