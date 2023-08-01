package com.eightlow.decalcomanie.user.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userId;

    private String accessToken;

    private String nickname;

    private LocalDateTime deletedAt;

    private int age;

    private int gender;

    private String refreshToken;

    private String picture;
}
