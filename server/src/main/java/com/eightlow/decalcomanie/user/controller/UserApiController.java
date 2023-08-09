package com.eightlow.decalcomanie.user.controller;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserApiController {

    private final IUserService userService;

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
    @GetMapping("/user/recommend")
    public ResponseEntity<List<PerfumeDto>> recommend(HttpServletRequest req) {
        return new ResponseEntity<>(userService.recommendUserPerfume((String)req.getAttribute("userId")), HttpStatus.OK);
    }
}

