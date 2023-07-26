package com.eightlow.decalcomanie.user.service.implement;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.entity.Follow;
import com.eightlow.decalcomanie.user.entity.User;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import com.eightlow.decalcomanie.user.entity.UserScent;
import com.eightlow.decalcomanie.user.mapper.FollowMapper;
import com.eightlow.decalcomanie.user.mapper.UserMapper;
import com.eightlow.decalcomanie.user.repository.FollowRepository;
import com.eightlow.decalcomanie.user.repository.UserPerfumeRepository;
import com.eightlow.decalcomanie.user.repository.UserRepository;
import com.eightlow.decalcomanie.user.repository.UserScentRepository;
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
    private final UserRepository userRepository;
    private final UserScentRepository userScentRepository;
    private final IPerfumeService perfumeService;
    private final FollowMapper followMapper;
    private final UserMapper userMapper;

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

    // 팔로잉 하고 있는 유저들의 정보를 가져온다
    @Override
    public List<FollowingResponse> getFollowingUsers(String userId) {
        // following 컬럼의 userId를 기준으로 조회
        List<Follow> myFollowing = followRepository.findByFollowing(userId);
        List<FollowingResponse> result = new ArrayList<>();

        for(Follow follow : myFollowing) {
            User user = userRepository.findByUserId(follow.getFollowed());

            List<String> favorite = new ArrayList<>();
        
            // userScent 테이블에서 팔로잉 하고 있는 사람의 'FAVORITE' 향을 조회
            List<UserScent> userScentList = userScentRepository.findAllUserScentByUserId(follow.getFollowed());

            if(userScentList != null) {
                for (UserScent scent : userScentList) {
                    favorite.add(perfumeService.getScentById(scent.getScentId()).getName());
                }
            }

            // 반환 포맷에 맞는 response 생성
            FollowingResponse response = new FollowingResponse(user.getUserId(), user.getNickname(), favorite, user.getPicture());

            result.add(response);
        }

        return result;
    }

    // 팔로워 목록 조회
    @Override
    public List<FollowerResponse> getFollowers(String userId) {
        List<Follow> myFollowing = followRepository.findByFollowed(userId);
        List<FollowerResponse> result = new ArrayList<>();

        for(Follow follow : myFollowing) {
            User user = userRepository.findByUserId(follow.getFollowing());

            List<String> favorite = new ArrayList<>();

            List<UserScent> userScentList = userScentRepository.findAllUserScentByUserId(follow.getFollowing());

            if(userScentList != null) {
                for (UserScent scent : userScentList) {
                    favorite.add(perfumeService.getScentById(scent.getScentId()).getName());
                }
            }

            FollowerResponse response = new FollowerResponse(user.getUserId(), user.getNickname(), favorite, user.getPicture(), isFollowing(userId, user.getUserId()));

            result.add(response);
        }

        return result;
    }

    // 팔로우 여부
    @Override
    public boolean isFollowing(String following, String followed) {
        Follow follow = followRepository.findByFollowingAndFollowed(following, followed);

        if(follow == null) return false;
        return true;
    }
}
