package com.eightlow.decalcomanie.common.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.eightlow.decalcomanie.common.dto.BaseDto;
import com.eightlow.decalcomanie.common.entity.BaseEntity;

@Mapper(componentModel = "spring")
public interface BaseMapper {
    BaseMapper instance = Mappers.getMapper(BaseMapper.class);

    BaseEntity dtoToEntity(BaseDto baseDto);

    BaseDto entityToDto(BaseEntity baseEntity);
}
