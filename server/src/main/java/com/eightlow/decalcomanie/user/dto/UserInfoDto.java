package com.eightlow.decalcomanie.user.dto;

import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserInfoDto {
    private UserDto user;
    private List<ScentDto> favorities;
    private List<ScentDto> hates;
    private boolean isFollowing;

    public UserInfoDto(UserDto dto, List<ScentDto> favorite, List<ScentDto> hate) {
        this.user = dto;
        this.favorities = favorite;
        this.hates = hate;
    }
}