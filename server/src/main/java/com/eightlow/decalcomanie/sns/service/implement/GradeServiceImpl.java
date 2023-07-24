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
        log.info("ArticleServiceImpl::: finish ", String.valueOf(grade.getRate()), String.valueOf(grade.getPerfumeId()));
    }
}
