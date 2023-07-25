package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.entity.Scent;
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
public class ScentMapperImpl implements ScentMapper {

    @Override
    public Scent toEntity(ScentDto scentDto) {
        if ( scentDto == null ) {
            return null;
        }

        Scent.ScentBuilder scent = Scent.builder();

        scent.scentId( scentDto.getScentId() );
        scent.name( scentDto.getName() );
        scent.rgb( scentDto.getRgb() );

        return scent.build();
    }

    @Override
    public ScentDto toDto(Scent scent) {
        if ( scent == null ) {
            return null;
        }

        ScentDto.ScentDtoBuilder scentDto = ScentDto.builder();

        scentDto.scentId( scent.getScentId() );
        scentDto.name( scent.getName() );
        scentDto.rgb( scent.getRgb() );

        return scentDto.build();
    }

    @Override
    public List<Scent> toEntity(List<ScentDto> scentDtoList) {
        if ( scentDtoList == null ) {
            return null;
        }

        List<Scent> list = new ArrayList<Scent>( scentDtoList.size() );
        for ( ScentDto scentDto : scentDtoList ) {
            list.add( toEntity( scentDto ) );
        }

        return list;
    }

    @Override
    public List<ScentDto> toDto(List<Scent> scentList) {
        if ( scentList == null ) {
            return null;
        }

        List<ScentDto> list = new ArrayList<ScentDto>( scentList.size() );
        for ( Scent scent : scentList ) {
            list.add( toDto( scent ) );
        }

        return list;
    }
}
