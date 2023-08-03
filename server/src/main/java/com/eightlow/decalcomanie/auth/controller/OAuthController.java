package com.eightlow.decalcomanie.auth.controller;


import com.eightlow.decalcomanie.auth.dto.KakaoProfile;
import com.eightlow.decalcomanie.auth.dto.LoginResponse;
import com.eightlow.decalcomanie.auth.dto.OAuthToken;
import com.eightlow.decalcomanie.auth.entity.UserCredential;
import com.eightlow.decalcomanie.auth.jwt.JwtUtils;
import com.eightlow.decalcomanie.auth.service.IOAuthService;
import com.eightlow.decalcomanie.auth.service.JwtService;
import com.eightlow.decalcomanie.user.dto.UserDto;
import com.eightlow.decalcomanie.user.mapper.UserMapper;
import com.eightlow.decalcomanie.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @Value("${jwt.secret}")
    private String secretKey;

    @GetMapping("/kakao/callback")
    public @ResponseBody ResponseEntity<LoginResponse> kakaoCallback(String code, HttpServletResponse res) throws IOException {
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

            UserCredential loginUser = userCredential.toBuilder()
                    .refreshToken(refreshToken)
                    .build();

            oAuthService.signIn(loginUser);

            LoginResponse loginResponse = LoginResponse.builder()
//                    .userId(userCredential.getUserId())
//                    .email(userCredential.getEmail())
                    .nickname(nickname)
                    .build();

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("accessToken", accessToken);
            responseHeaders.set("refreshToken", refreshToken);

            return new ResponseEntity<>(loginResponse, responseHeaders, HttpStatus.OK);
        }

        UUID userId = UUID.randomUUID();

        String accessToken = jwtService.generateAccessToken(kakaoProfile.getId().toString(), userId.toString());
        String refreshToken = jwtService.generateRefreshToken(kakaoProfile.getId().toString(), userId.toString());

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
//                .userId(userId.toString())
                .nickname(userInfo.getNickname())
//                .email(userCredential.getEmail())
                .build();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("accessToken", accessToken);
        responseHeaders.set("refreshToken", refreshToken);

        return new ResponseEntity<>(loginResponse, responseHeaders, HttpStatus.CREATED);
    }

    @GetMapping("/reissue")
    public ResponseEntity<String> reissue(@RequestHeader HttpHeaders header, HttpServletResponse response) throws IOException {
        if (jwtService.isValidToken(header.getFirst("refreshToken"))) {
            HttpHeaders responseHeader = new HttpHeaders();

            Jws<Claims> claims = JwtUtils.parseToken(header.getFirst("refreshToken"), secretKey);
            String userId = claims.getBody().get("userId", String.class);
            String nickname = claims.getBody().get("nickname", String.class);

            String accessToken = jwtService.generateAccessToken(nickname, userId);
            String refreshToken = jwtService.generateRefreshToken(nickname, userId);

            responseHeader.set("accessToken", accessToken);
            responseHeader.set("refreshToken", refreshToken);

            oAuthService.updateRefreshToken(refreshToken, userId);

            return new ResponseEntity("refreshToken 재발급 완료!", responseHeader, HttpStatus.OK);
        }

        return new ResponseEntity("refreshToken 대조 실패! 로그아웃", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/signout")
    public ResponseEntity signOut(HttpServletRequest request) {
        oAuthService.signOut((String) request.getAttribute("userId"));
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/withdrawal")
    public ResponseEntity deleteUser(HttpServletRequest request) {
        // TODO: 해당 회원이 찜한 향수 모두 삭제

        // TODO: 해당 회원이 스크랩한 글 모두 스크랩 해제

        // TODO: 해당 회원이 쓴 글의 userId 모두 유령프로필의 userId로 변경

        // TODO: 해당 회원이 쓴 댓글 모두 삭제

        // TODO: 팔로우 테이블에서 해당 회원이 포함된 모든 항목을 제거
        oAuthService.deleteUser((String) request.getAttribute("userId"));
        return new ResponseEntity(HttpStatus.OK);
    }
}

