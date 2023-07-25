package com.eightlow.decalcomanie.user.mapper;

import com.eightlow.decalcomanie.user.dto.request.UserPerfumeAddRequest;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface UserPerfumeMapper {
    UserPerfume toEntity(UserPerfumeAddRequest userPerfumeAddRequest);

    UserPerfumeAddRequest toDto(UserPerfume userPerfume);

    List<UserPerfume> toEntity(List<UserPerfumeAddRequest> userPerfumeAddRequestList);

    List<UserPerfumeAddRequest> toDto(List<UserPerfume> userPerfumeList);
}
