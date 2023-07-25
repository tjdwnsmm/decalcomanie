package com.eightlow.decalcomanie.user.controller;

import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.eightlow.decalcomanie.user.dto.request.UserPerfumeAddRequest;
import com.eightlow.decalcomanie.user.mapper.UserPerfumeMapper;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserApiController {

    private final IUserService userService;
    private final UserPerfumeMapper userPerfumeMapper;

    @PostMapping("/perfume")
    public ResponseEntity<String> addUserPerfume(@RequestBody UserPerfumeAddRequest request) {
        userService.addUserPerfume(userPerfumeMapper.toEntity(request));
        String userMessage = "향수가 등록되었습니다";
        return new ResponseEntity<>(userMessage, HttpStatus.CREATED);
    }

}
