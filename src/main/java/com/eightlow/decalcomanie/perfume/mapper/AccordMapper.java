package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.AccordDto;
import com.eightlow.decalcomanie.perfume.entity.Accord;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface AccordMapper {
    Accord toEntity(AccordDto accordDto);

    AccordDto toDto(Accord accord);

    List<Accord> toEntity(List<AccordDto> accordDtoList);

    List<AccordDto> toDto(List<Accord> accordList);
}
