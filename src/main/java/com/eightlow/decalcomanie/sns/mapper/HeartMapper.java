package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.HeartDto;
import com.eightlow.decalcomanie.sns.entity.Heart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HeartMapper {
    HeartDto toDto(Heart heart);
    Heart toEntity(HeartDto heartDto);
}
