package com.eightlow.decalcomanie.user.service.implement;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.eightlow.decalcomanie.user.entity.Follow;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import com.eightlow.decalcomanie.user.mapper.FollowMapper;
import com.eightlow.decalcomanie.user.repository.FollowRepository;
import com.eightlow.decalcomanie.user.repository.UserPerfumeRepository;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserPerfumeRepository userPerfumeRepository;
    private final FollowRepository followRepository;
    private final IPerfumeService perfumeService;
    private final FollowMapper followMapper;

    @Override
    public String modifyUserPerfume(UserPerfume userPerfume) {
        UserPerfume perfume = userPerfumeRepository.findByUserIdAndPerfumeId(userPerfume.getUserId(), userPerfume.getPerfumeId());

        if(perfume == null) {
            userPerfumeRepository.save(userPerfume);
            return "향수가 등록되었습니다";
        }

        userPerfumeRepository.deleteByUserIdAndPerfumeId(userPerfume.getUserId(), userPerfume.getPerfumeId());
        return "향수가 제거되었습니다";
    }

    @Override
    public List<PerfumeDto> getUserPerfume(String userId) {
        List<UserPerfume> userPerfumes = userPerfumeRepository.findByUserId(userId);
        List<PerfumeDto> result = new ArrayList<>();

        for(UserPerfume perfume : userPerfumes) {
            result.add(perfumeService.getPerfume(perfume.getPerfumeId()));
        }

        return result;
    }

    // following = 팔로우 주체의 userId, followed = 팔로우를 할 사람의 userId
    @Override
    public String followUser(String following, String followed) {
        System.out.println(following);
        System.out.println(followed);

        if(isFollowing(following, followed)) {
            followRepository.deleteByFollowingAndFollowed(following, followed);
            return "팔로우가 취소되었습니다";
        }

        Follow follow = new Follow(following, followed);
        followRepository.save(follow);
        return "팔로우가 완료되었습니다";
    }

    // 팔로우 여부
    @Override
    public boolean isFollowing(String following, String followed) {
        Follow follow = followRepository.findByFollowingAndFollowed(following, followed);

        if(follow == null) return false;
        return true;
    }
}
