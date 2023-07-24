package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.entity.Brand;
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
