package com.eightlow.decalcomanie.user.service;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.user.dto.FollowDto;
import com.eightlow.decalcomanie.user.entity.UserPerfume;

import java.util.List;

public interface IUserService {
    String modifyUserPerfume(UserPerfume userPerfume);

    List<PerfumeDto> getUserPerfume(String userId);

    boolean isFollowing(String from, String to);

    String followUser(String from, String to);
}
