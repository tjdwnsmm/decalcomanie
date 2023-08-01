package com.eightlow.decalcomanie.user.mapper;

import com.eightlow.decalcomanie.user.dto.FollowDto;
import com.eightlow.decalcomanie.user.entity.Follow;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface FollowMapper {
    Follow toEntity(FollowDto followDto);

    FollowDto toDto(Follow follow);

    List<Follow> toEntity(List<FollowDto> followDtoList);

    List<FollowDto> toDto(List<Follow> followList);
}
