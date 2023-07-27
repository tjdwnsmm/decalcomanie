package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-26T17:30:18+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class PerfumeMapperImpl implements PerfumeMapper {

    @Override
    public Perfume toEntity(PerfumeDto perfumeDto) {
        if ( perfumeDto == null ) {
            return null;
        }

        Perfume.PerfumeBuilder perfume = Perfume.builder();

        perfume.perfumeId( perfumeDto.getPerfumeId() );
        perfume.name( perfumeDto.getName() );
        perfume.nameOrg( perfumeDto.getNameOrg() );
        perfume.brandId( perfumeDto.getBrandId() );
        perfume.picture( perfumeDto.getPicture() );
        perfume.gender( perfumeDto.getGender() );
        perfume.rate( perfumeDto.getRate() );
        perfume.longevity( perfumeDto.getLongevity() );
        perfume.sillage( perfumeDto.getSillage() );
        perfume.pick( perfumeDto.getPick() );

        return perfume.build();
    }

    @Override
    public PerfumeDto toDto(Perfume perfume) {
        if ( perfume == null ) {
            return null;
        }

        PerfumeDto.PerfumeDtoBuilder perfumeDto = PerfumeDto.builder();

        perfumeDto.perfumeId( perfume.getPerfumeId() );
        perfumeDto.name( perfume.getName() );
        perfumeDto.nameOrg( perfume.getNameOrg() );
        perfumeDto.brandId( perfume.getBrandId() );
        perfumeDto.picture( perfume.getPicture() );
        perfumeDto.gender( perfume.getGender() );
        perfumeDto.rate( perfume.getRate() );
        perfumeDto.longevity( perfume.getLongevity() );
        perfumeDto.sillage( perfume.getSillage() );
        perfumeDto.pick( perfume.getPick() );

        return perfumeDto.build();
    }

    @Override
    public List<Perfume> toEntity(List<PerfumeDto> perfumeDtoList) {
        if ( perfumeDtoList == null ) {
            return null;
        }

        List<Perfume> list = new ArrayList<Perfume>( perfumeDtoList.size() );
        for ( PerfumeDto perfumeDto : perfumeDtoList ) {
            list.add( toEntity( perfumeDto ) );
        }

        return list;
    }

    @Override
    public List<PerfumeDto> toDto(List<Perfume> perfumeList) {
        if ( perfumeList == null ) {
            return null;
        }

        List<PerfumeDto> list = new ArrayList<PerfumeDto>( perfumeList.size() );
        for ( Perfume perfume : perfumeList ) {
            list.add( toDto( perfume ) );
        }

        return list;
    }
}
