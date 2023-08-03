package com.eightlow.decalcomanie.user.controller;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.user.dto.FollowDto;
import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import com.eightlow.decalcomanie.user.mapper.UserPerfumeMapper;
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
    private final UserPerfumeMapper userPerfumeMapper;

    // 사용자 향수 등록, 삭제
    @PostMapping("/perfume/manage")
    public ResponseEntity<String> modifyUserPerfume(@RequestBody Map<String, Integer> request, HttpServletRequest req) {
        UserPerfume userPerfume = new UserPerfume((String)req.getAttribute("userId"), request.get("perfumeId"));
        String userMessage = userService.modifyUserPerfume(userPerfume);
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

}
