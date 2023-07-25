package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.AccordDto;
import com.eightlow.decalcomanie.perfume.entity.Accord;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-25T11:09:54+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class AccordMapperImpl implements AccordMapper {

    @Override
    public Accord toEntity(AccordDto accordDto) {
        if ( accordDto == null ) {
            return null;
        }

        Accord.AccordBuilder accord = Accord.builder();

        accord.accordId( accordDto.getAccordId() );
        accord.weight( accordDto.getWeight() );
        accord.perfumeId( accordDto.getPerfumeId() );
        accord.scentId( accordDto.getScentId() );

        return accord.build();
    }

    @Override
    public AccordDto toDto(Accord accord) {
        if ( accord == null ) {
            return null;
        }

        AccordDto.AccordDtoBuilder accordDto = AccordDto.builder();

        accordDto.accordId( accord.getAccordId() );
        accordDto.weight( accord.getWeight() );
        accordDto.perfumeId( accord.getPerfumeId() );
        accordDto.scentId( accord.getScentId() );

        return accordDto.build();
    }

    @Override
    public List<Accord> toEntity(List<AccordDto> accordDtoList) {
        if ( accordDtoList == null ) {
            return null;
        }

        List<Accord> list = new ArrayList<Accord>( accordDtoList.size() );
        for ( AccordDto accordDto : accordDtoList ) {
            list.add( toEntity( accordDto ) );
        }

        return list;
    }

    @Override
    public List<AccordDto> toDto(List<Accord> accordList) {
        if ( accordList == null ) {
            return null;
        }

        List<AccordDto> list = new ArrayList<AccordDto>( accordList.size() );
        for ( Accord accord : accordList ) {
            list.add( toDto( accord ) );
        }

        return list;
    }
}
