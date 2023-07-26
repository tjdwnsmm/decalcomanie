package com.eightlow.decalcomanie.user.controller;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.user.dto.FollowDto;
import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.mapper.UserPerfumeMapper;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserApiController {

    private final IUserService userService;
    private final UserPerfumeMapper userPerfumeMapper;

    // 사용자 향수 등록, 삭제
    @PostMapping("/perfume/manage")
    public ResponseEntity<String> modifyUserPerfume(@RequestBody UserPerfumeDto request) {
        String userMessage = userService.modifyUserPerfume(userPerfumeMapper.toEntity(request));
        return new ResponseEntity<>(userMessage, HttpStatus.CREATED);
    }

    // 사용자 향수 조회
    @GetMapping("/perfume/{userId}")
    public ResponseEntity<List<PerfumeDto>> getUserPerfume(@PathVariable String userId) {
        return new ResponseEntity<>(userService.getUserPerfume(userId), HttpStatus.OK);
    }

    // 팔로우
    @PostMapping("/follow")
    public ResponseEntity<String> followUser(@RequestBody FollowDto request) {
        return new ResponseEntity<>(userService.followUser(request.getFollowing(), request.getFollowed()), HttpStatus.CREATED);
    }

    // 팔로잉 목록 조회
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<FollowingResponse>> getFollowingUsers(@PathVariable String userId) {
        return new ResponseEntity<>(userService.getFollowingUsers(userId), HttpStatus.OK);
    }

}
