package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.sns.entity.Grade;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-24T11:06:12+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class GradeMapperImpl implements GradeMapper {

    @Override
    public Grade toEntity(GradeDto gradeDto) {
        if ( gradeDto == null ) {
            return null;
        }

        Grade.GradeBuilder<?, ?> grade = Grade.builder();

        grade.userId( gradeDto.getUserId() );
        grade.perfumeId( gradeDto.getPerfumeId() );
        grade.rate( gradeDto.getRate() );

        return grade.build();
    }

    @Override
    public GradeDto toDto(Grade grade) {
        if ( grade == null ) {
            return null;
        }

        GradeDto.GradeDtoBuilder<?, ?> gradeDto = GradeDto.builder();

        gradeDto.userId( grade.getUserId() );
        gradeDto.perfumeId( grade.getPerfumeId() );
        gradeDto.rate( grade.getRate() );

        return gradeDto.build();
    }

    @Override
    public List<Grade> toEntity(List<GradeDto> gradeDtoList) {
        if ( gradeDtoList == null ) {
            return null;
        }

        List<Grade> list = new ArrayList<Grade>( gradeDtoList.size() );
        for ( GradeDto gradeDto : gradeDtoList ) {
            list.add( toEntity( gradeDto ) );
        }

        return list;
    }

    @Override
    public List<GradeDto> toDto(List<Grade> gradeList) {
        if ( gradeList == null ) {
            return null;
        }

        List<GradeDto> list = new ArrayList<GradeDto>( gradeList.size() );
        for ( Grade grade : gradeList ) {
            list.add( toDto( grade ) );
        }

        return list;
    }
}
