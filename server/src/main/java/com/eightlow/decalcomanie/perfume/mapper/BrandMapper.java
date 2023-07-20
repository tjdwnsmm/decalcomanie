package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.entity.Brand;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface BrandMapper {
    Brand toEntity(BrandDto brandDto);

    BrandDto toDto(Brand brand);

    List<Brand> toEntity(List<BrandDto> brandDtoList);

    List<BrandDto> toDto(List<Brand> brandList);
}
