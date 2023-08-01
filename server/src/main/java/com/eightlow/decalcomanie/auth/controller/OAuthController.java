package com.eightlow.decalcomanie.auth.controller;


import com.eightlow.decalcomanie.auth.dto.KakaoProfile;
import com.eightlow.decalcomanie.auth.dto.LoginResponse;
import com.eightlow.decalcomanie.auth.dto.OAuthToken;
import com.eightlow.decalcomanie.auth.entity.UserCredential;
import com.eightlow.decalcomanie.auth.service.IOAuthService;
import com.eightlow.decalcomanie.auth.service.JwtService;
import com.eightlow.decalcomanie.user.dto.UserDto;
import com.eightlow.decalcomanie.user.mapper.UserMapper;
import com.eightlow.decalcomanie.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {
    private final IOAuthService oAuthService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @GetMapping("/kakao/callback")
    public @ResponseBody ResponseEntity<LoginResponse> kakaoCallback(String code) {
        // 카카오에서 넘겨받은 access code로 accessToken 요청
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", "http://localhost:8080/oauth/kakao/callback");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oAuthToken = null;

        try {
             oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // accessToken으로 카카오에 사용자 정보 요청
        RestTemplate rt2 = new RestTemplate();
        HttpHeaders headers2 = new HttpHeaders();

        headers2.add("Authorization", "Bearer " + oAuthToken.getAccessToken());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers2);

        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfile kakaoProfile = null;

        try {
            kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        UserCredential userCredential = oAuthService.isMember(kakaoProfile.getKakaoAccount().getEmail());

        if(userCredential != null) {
            String nickname = userRepository.findByUserId(userCredential.getUserId()).getNickname();

            String accessToken = jwtService.generateAccessToken(nickname, userCredential.getUserId());
            String refreshToken = jwtService.generateRefreshToken(nickname, userCredential.getUserId());

            userCredential.toBuilder()
                           .refreshToken(refreshToken)
                           .build();

            oAuthService.signIn(userCredential);

            LoginResponse loginResponse = LoginResponse.builder()
                    .userId(userCredential.getUserId())
                    .email(userCredential.getEmail())
                    .userName(nickname)
                    .build();

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("accessToken", accessToken);
            responseHeaders.set("refreshToken", refreshToken);

            return new ResponseEntity<>(loginResponse, responseHeaders, HttpStatus.OK);
        }

        UUID userId = UUID.randomUUID();

        String accessToken = jwtService.generateAccessToken(kakaoProfile.getId().toString(), userCredential.getUserId());
        String refreshToken = jwtService.generateRefreshToken(kakaoProfile.getId().toString(), userCredential.getUserId());

        userCredential = UserCredential.builder()
                .userId(userId.toString())
                .email(kakaoProfile.getKakaoAccount().getEmail())
                .refreshToken(jwtService.generateRefreshToken(refreshToken, userId.toString()))
                .build();

        int age = Integer.parseInt(kakaoProfile.getKakaoAccount().getAgeRange().split("~")[0]);

        UserDto userInfo = UserDto.builder()
                .userId(userId.toString())
                .nickname(kakaoProfile.getId().toString())
                .age(age)
                .gender(kakaoProfile.getKakaoAccount().getGender().equals("male") ? 0 : 1)
                .build();

        oAuthService.register(userCredential, userMapper.toEntity(userInfo));

        LoginResponse loginResponse = LoginResponse.builder()
                .userId(userId.toString())
                .userName(userInfo.getNickname())
                .email(userCredential.getEmail())
                .build();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("accessToken", accessToken);
        responseHeaders.set("refreshToken", refreshToken);

        return new ResponseEntity<>(loginResponse, responseHeaders, HttpStatus.OK);
    }
}
