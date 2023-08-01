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
}
