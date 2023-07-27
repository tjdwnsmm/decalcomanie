package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.entity.Brand;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-26T17:30:19+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class BrandMapperImpl implements BrandMapper {

    @Override
    public Brand toEntity(BrandDto brandDto) {
        if ( brandDto == null ) {
            return null;
        }

        Brand.BrandBuilder brand = Brand.builder();

        brand.brandId( brandDto.getBrandId() );
        brand.name( brandDto.getName() );

        return brand.build();
    }

    @Override
    public BrandDto toDto(Brand brand) {
        if ( brand == null ) {
            return null;
        }

        BrandDto.BrandDtoBuilder brandDto = BrandDto.builder();

        brandDto.brandId( brand.getBrandId() );
        brandDto.name( brand.getName() );

        return brandDto.build();
    }

    @Override
    public List<Brand> toEntity(List<BrandDto> brandDtoList) {
        if ( brandDtoList == null ) {
            return null;
        }

        List<Brand> list = new ArrayList<Brand>( brandDtoList.size() );
        for ( BrandDto brandDto : brandDtoList ) {
            list.add( toEntity( brandDto ) );
        }

        return list;
    }

    @Override
    public List<BrandDto> toDto(List<Brand> brandList) {
        if ( brandList == null ) {
            return null;
        }

        List<BrandDto> list = new ArrayList<BrandDto>( brandList.size() );
        for ( Brand brand : brandList ) {
            list.add( toDto( brand ) );
        }

        return list;
    }
}
