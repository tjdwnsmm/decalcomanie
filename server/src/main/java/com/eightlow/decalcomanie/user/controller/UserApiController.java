package com.eightlow.decalcomanie.user.controller;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.user.dto.request.UserPerfumeAddRequest;
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
    @PostMapping("/perfume")
    public ResponseEntity<String> modifyUserPerfume(@RequestBody UserPerfumeAddRequest request) {
        String userMessage = userService.modifyUserPerfume(userPerfumeMapper.toEntity(request));
        return new ResponseEntity<>(userMessage, HttpStatus.CREATED);
    }

    // 사용자 향수 조회
    @GetMapping("/perfume")
    public ResponseEntity<List<PerfumeDto>> getUserPerfume(@RequestHeader("userId") String userId) {
        return new ResponseEntity<>(userService.getUserPerfume(userId), HttpStatus.OK);
    }

}
