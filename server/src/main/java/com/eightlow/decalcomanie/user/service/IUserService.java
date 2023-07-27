package com.eightlow.decalcomanie.user.service;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.user.dto.FollowDto;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.entity.Follow;
import com.eightlow.decalcomanie.user.entity.UserPerfume;

import java.util.List;

public interface IUserService {
    String modifyUserPerfume(UserPerfume userPerfume);

    List<PerfumeDto> getUserPerfume(String userId);

    boolean isFollowing(String from, String to);

    String followUser(String from, String to);

    List<FollowingResponse> getFollowingUsers(String userId);

    List<FollowerResponse> getFollowers(String userId);

    UserInfoDto getUserInfo(Follow follow);
}
