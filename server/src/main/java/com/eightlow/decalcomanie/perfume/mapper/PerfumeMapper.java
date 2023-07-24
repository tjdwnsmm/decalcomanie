package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface PerfumeMapper {
    Perfume toEntity(PerfumeDto perfumeDto);

    PerfumeDto toDto(Perfume perfume);

    List<Perfume> toEntity(List<PerfumeDto> perfumeDtoList);

    List<PerfumeDto> toDto(List<Perfume> perfumeList);
}
