package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.BookMarkDto;
import com.eightlow.decalcomanie.sns.entity.BookMark;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMarkMapper {
    BookMarkDto toDto(BookMark bookMark);
    BookMark toEntity(BookMarkDto bookMarkDto);
}
