package com.eightlow.decalcomanie.common.mapper;

import com.eightlow.decalcomanie.common.dto.BaseDto;
import com.eightlow.decalcomanie.common.entity.BaseEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-24T14:48:32+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class BaseMapperImpl implements BaseMapper {

    @Override
    public BaseEntity dtoToEntity(BaseDto baseDto) {
        if ( baseDto == null ) {
            return null;
        }

        BaseEntity.BaseEntityBuilder<?, ?> baseEntity = BaseEntity.builder();

        baseEntity.createdAt( baseDto.getCreatedAt() );
        baseEntity.updatedAt( baseDto.getUpdatedAt() );

        return baseEntity.build();
    }

    @Override
    public BaseDto entityToDto(BaseEntity baseEntity) {
        if ( baseEntity == null ) {
            return null;
        }

        BaseDto.BaseDtoBuilder<?, ?> baseDto = BaseDto.builder();

        baseDto.createdAt( baseEntity.getCreatedAt() );
        baseDto.updatedAt( baseEntity.getUpdatedAt() );

        return baseDto.build();
    }
}
