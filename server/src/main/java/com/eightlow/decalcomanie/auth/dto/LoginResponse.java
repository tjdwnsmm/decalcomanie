package com.eightlow.decalcomanie.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class LoginResponse {
    private String userId;

    private String email;

    private String nickname;
}
