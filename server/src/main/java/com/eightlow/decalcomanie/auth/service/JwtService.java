package com.eightlow.decalcomanie.auth.service;

import com.eightlow.decalcomanie.auth.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expire}")
    private int accessTokenExpire;

    @Value("${jwt.refresh-token-expire}")
    private int refreshTokenExpire;

    public String generateAccessToken(String nickname, String userId) {
        return JwtUtils.createJwt(nickname, userId, secretKey, accessTokenExpire);
    }

    public String generateRefreshToken(String nickname, String userId) {
        return JwtUtils.createJwt(nickname, userId, secretKey, refreshTokenExpire);
    }
}
