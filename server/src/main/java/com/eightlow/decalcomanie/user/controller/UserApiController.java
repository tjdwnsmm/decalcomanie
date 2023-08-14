package com.eightlow.decalcomanie.user.controller;

import com.eightlow.decalcomanie.auth.jwt.JwtUtils;
import com.eightlow.decalcomanie.auth.service.JwtService;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.sns.dto.response.Response;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import com.eightlow.decalcomanie.user.dto.request.UserInfoUpdateRequest;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.service.IUserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserApiController {

    private final IUserService userService;
    private final JwtService jwtService;

    // 사용자 향수 등록, 삭제
    @PostMapping("/perfume/manage")
    public ResponseEntity<String> modifyUserPerfume(@RequestBody Map<String, Integer> request, HttpServletRequest req) {
        String userMessage = userService.modifyUserPerfume((String)req.getAttribute("userId"), request.get("perfumeId"));
        return new ResponseEntity<>(userMessage, HttpStatus.CREATED);
    }

    // 사용자 향수 조회
    @GetMapping("/perfume")
    public ResponseEntity<List<PerfumeDto>> getUserPerfume(HttpServletRequest req) {
        return new ResponseEntity<>(userService.getUserPerfume((String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 팔로우
    @PostMapping("/follow")
    public ResponseEntity<String> followUser(@RequestBody Map<String, String> request, HttpServletRequest req) {
        return new ResponseEntity<>(userService.followUser((String)req.getAttribute("userId"), request.get("to")), HttpStatus.CREATED);
    }

    // 팔로잉 목록 조회
    @GetMapping("/following")
    public ResponseEntity<List<FollowingResponse>> getFollowingUsers(HttpServletRequest req) {
        return new ResponseEntity<>(userService.getFollowingUsers((String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 팔로우 목록 조회
    @GetMapping("/follower")
    public ResponseEntity<List<FollowerResponse>> getFollowers(HttpServletRequest req) {
        return new ResponseEntity<>(userService.getFollowers((String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 다른 유저의 팔로잉 목록 조회
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<FollowerResponse>> getOtherFollowingUsers(@PathVariable String userId, HttpServletRequest req) {
        return new ResponseEntity<>(userService.getOtherFollowingUsers(userId, (String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 다른 유저의 팔로우 목록 조회
    @GetMapping("/follower/{userId}")
    public ResponseEntity<List<FollowerResponse>> getOtherFollowers(@PathVariable String userId, HttpServletRequest req) {
        return new ResponseEntity<>(userService.getOtherFollowers(userId, (String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 사용자 개인 추천 향수
    @GetMapping("/recommend")
    public ResponseEntity<List<PerfumeDto>> recommend(HttpServletRequest req) {
        return new ResponseEntity<>(userService.getUserPerfumeRecommend((String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 사용자 향수 추천 로직 실행
    @GetMapping("/recommend/update")
    public ResponseEntity<List<PerfumeDto>> recommendUpdate(HttpServletRequest req) {
        return new ResponseEntity<>(userService.recommendUserPerfume((String)req.getAttribute("userId")), HttpStatus.OK);
    }

    // 닉네임 중복검사
    @GetMapping("/update/check/{nickname}")
    public ResponseEntity<Map<String, Boolean>> checkDuplicated(@PathVariable String nickname) {
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("available", userService.checkDuplicated(nickname));
        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, String>> updateUserInfo(@RequestBody UserInfoUpdateRequest request, HttpServletRequest req) {
        Map<String, String> responseMap = new HashMap<>();
        String userId = (String)req.getAttribute("userId");
        String updatedNickname = userService.updateUserInfo(request, userId);
        responseMap.put("nickname", updatedNickname);

        HttpHeaders responseHeader = new HttpHeaders();

        String accessToken = jwtService.generateAccessToken(updatedNickname, userId);

        responseHeader.set("accessToken", accessToken);

        return new ResponseEntity<>(responseMap, responseHeader, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> getUserInfo(HttpServletRequest req) {
        return new ResponseEntity<>(userService.getUserInfo((String)req.getAttribute("userId")), HttpStatus.OK);
    }

    @DeleteMapping("/withdrawal")
    public ResponseEntity<String> withdrawUser(HttpServletRequest req) {
        userService.withdrawUser((String)req.getAttribute("userId"));
        return new ResponseEntity<>("회원 탈퇴 완료!", HttpStatus.OK);
    }
}

