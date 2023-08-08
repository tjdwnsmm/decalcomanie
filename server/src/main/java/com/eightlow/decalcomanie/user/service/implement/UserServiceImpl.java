package com.eightlow.decalcomanie.user.service.implement;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.mapper.PerfumeMapper;
import com.eightlow.decalcomanie.perfume.mapper.ScentMapper;
import com.eightlow.decalcomanie.perfume.repository.PerfumeRepository;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.eightlow.decalcomanie.user.dto.PerfumeWeight;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.entity.Follow;
import com.eightlow.decalcomanie.user.entity.User;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import com.eightlow.decalcomanie.user.entity.UserScent;
import com.eightlow.decalcomanie.user.mapper.FollowMapper;
import com.eightlow.decalcomanie.user.mapper.UserMapper;
import com.eightlow.decalcomanie.user.mapper.UserPerfumeMapper;
import com.eightlow.decalcomanie.user.repository.FollowRepository;
import com.eightlow.decalcomanie.user.repository.UserPerfumeRepository;
import com.eightlow.decalcomanie.user.repository.UserRepository;
import com.eightlow.decalcomanie.user.repository.UserScentRepository;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    private final ScentMapper scentMapper;
    private final PerfumeRepository perfumeRepository;
    private final UserPerfumeMapper userPerfumeMapper;
    private final PerfumeMapper perfumeMapper;

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
        System.out.println("sdfsd" + myFollowing.toString());
        List<FollowingResponse> result = new ArrayList<>();

        if(myFollowing.size() > 0) {
            for(Follow follow : myFollowing) {
                // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보들을 가져온다.
                UserInfoDto userInfoDto = getUserInfo(follow.getFollowed());
                System.out.println(userInfoDto);

                // 반환 포맷에 맞는 response 생성
                FollowingResponse response = new FollowingResponse(userInfoDto.getUser().getUserId(),
                        userInfoDto.getUser().getNickname(),
                        userInfoDto.getFavorities(),
                        userInfoDto.getHates(),
                        userInfoDto.getUser().getPicture());

                result.add(response);
            }
        }

        return result;
    }

    // 팔로워 목록 조회
    @Override
    public List<FollowerResponse> getFollowers(String userId) {
        List<Follow> myFollower = followRepository.findByFollowed(userId);
        List<FollowerResponse> result = new ArrayList<>();

        if(myFollower.size() > 0) {
            for(Follow follow : myFollower) {
                // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보들을 가져온다.
                UserInfoDto userInfoDto = getUserInfo(follow.getFollowing());

                FollowerResponse response = new FollowerResponse(userInfoDto.getUser().getUserId(),
                        userInfoDto.getUser().getNickname(),
                        userInfoDto.getFavorities(),
                        userInfoDto.getHates(),
                        userInfoDto.getUser().getPicture(),
                        isFollowing(userId, userInfoDto.getUser().getUserId()));

                result.add(response);
            }
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

    // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보
    @Override
    public UserInfoDto getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId);
        System.out.println(userMapper.toDto(user));

        List<ScentDto> favorite = new ArrayList<>();
        List<ScentDto> hate = new ArrayList<>();

        // userScent 테이블에서 팔로잉 하고 있는 사람의 좋아하는 향, 싫어하느 향을 조회
        List<UserScent> userScentList = userScentRepository.findUserScentByUserId(userId);

        if(userScentList != null) {
            for (UserScent scent : userScentList) {
                if(scent.getStatus().getValue().equals("FAVORITE")) {
                    favorite.add(scentMapper.toDto(perfumeService.getScentById(scent.getScentId())));
                } else if(scent.getStatus().getValue().equals("HATE")) {
                    hate.add(scentMapper.toDto(perfumeService.getScentById(scent.getScentId())));
                }
            }
        }

        UserInfoDto userInfoDto = new UserInfoDto(userMapper.toDto(user), favorite, hate);
        return userInfoDto;
    }

    // 사용자 개인 추천 향수
    @Override
    public List<PerfumeDto> recommendUserPerfume(String userId) {
        // 사용자 향 단위 벡터 계산
        List<Double> userPerfumeVector = userAccordVector(userId);

        System.out.println(userPerfumeVector.toString());

        // 사용자 향과 모든 향수 유사도 계산
        List<PerfumeWeight> result = caclulate(userPerfumeVector);

        // 탑 10 추출
        List<PerfumeDto> perfumeList = new ArrayList<>();
        for (PerfumeWeight pair : result) {
            perfumeList.add(pair.getFirst());
            System.out.print(pair.getFirst().getPerfumeId()+", ");
        }
        // result의 상단 10개하여 반환
        return perfumeList.subList(0, Math.min(result.size(),10));
    }

    @Override
    public List<FollowerResponse> getOtherFollowingUsers(String userId, String myId) {
        // following 컬럼의 userId를 기준으로 조회
        List<Follow> followings = followRepository.findByFollowing(userId);
        List<FollowerResponse> result = new ArrayList<>();

        if(followings.size() > 0) {
            for(Follow follow : followings) {
                // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보들을 가져온다.
                UserInfoDto userInfoDto = getUserInfo(follow.getFollowed());

                FollowerResponse response = FollowerResponse.builder()
                        .userId(userInfoDto.getUser().getUserId())
                        .nickname(userInfoDto.getUser().getNickname())
                        .favorite(userInfoDto.getFavorities())
                        .hates(userInfoDto.getHates())
                        .picture(userInfoDto.getUser().getPicture())
                        .isFollowing(isFollowing(myId, userInfoDto.getUser().getUserId()))
                        .build();

                result.add(response);
            }
        }

        return result;
    }

    @Override
    public List<FollowerResponse> getOtherFollowers(String userId, String myId) {
        List<Follow> followers = followRepository.findByFollowed(userId);
        List<FollowerResponse> result = new ArrayList<>();

        if(followers.size() > 0) {
            for(Follow follow : followers) {
                // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보들을 가져온다.
                UserInfoDto userInfoDto = getUserInfo(follow.getFollowing());

                FollowerResponse response = FollowerResponse.builder()
                        .userId(userInfoDto.getUser().getUserId())
                        .nickname(userInfoDto.getUser().getNickname())
                        .favorite(userInfoDto.getFavorities())
                        .hates(userInfoDto.getHates())
                        .picture(userInfoDto.getUser().getPicture())
                        .isFollowing(isFollowing(myId, userInfoDto.getUser().getUserId()))
                        .build();

                result.add(response);
            }
        }

        return result;
    }

    // 사용자 향 단뒤 벡터 계산
    public List<Double> userAccordVector(String userId) {
        // 사용자가 보유하고 있는 향수 정보를 가져온다.
        List<UserPerfume> userPerfumes = userPerfumeRepository.findByUserId(userId);
        List<UserPerfumeDto> userPerfumesDto = userPerfumeMapper.toDto(userPerfumes);

        // 사용자의 향수 x 향 테이블
        List<List<Double>> userPerfumePercentTable = new ArrayList<>();

        // 사용자의 향수 x 향 테이블 계산
        for(UserPerfumeDto perfume : userPerfumesDto) {
            PerfumeDto userPerfume = perfumeService.getPerfume(perfume.getPerfumeId());
            List<Double> accordPercent = sumAccordWeight(userPerfume.getAccord());
            userPerfumePercentTable.add(accordPercent);
        }

        List<Double> userAccordPercent = new ArrayList<>();
        // 사용자의 향 벡터 계산
        // 향 별 계산
        for(int i=0; i<= userPerfumePercentTable.get(0).size(); i++){
            Double accordSum = 0.0;
            // 사용자별 계산
            for(List<Double> userPerfumePercent : userPerfumePercentTable){
                accordSum += userPerfumePercent.get(i);
            }
            userAccordPercent.add(accordSum);
        }
        List<Double> result = new ArrayList<>();
        result = staticListToPercentList(userAccordPercent);

        return result;
    }

    // 향리스트를 향퍼센트 리스트로 변환해주는 함수
    public List<Double> sumAccordWeight(List<ScentDto> accordlist){
        List<Double> result = new ArrayList<>();
        int sum = 0;
        for(ScentDto scentDto : accordlist){
            sum += scentDto.getWeight();
        }
        for(ScentDto scentDto : accordlist){
            Double accordPercent = (double) scentDto.getWeight() / (double) sum;
            result.add(accordPercent);
        }
        return result;
    }

    // 고정 값 리스트들을 퍼센트 리스트로 변환 해주는 함수
    public List<Double> staticListToPercentList(List<Double> staticList){
        List<Double> result = new ArrayList<>();
        Double sum = 0.0;
        for(double a : staticList){
            sum += a;
        }
        for(double b : staticList){
            Double percent = b / sum;
            result.add(percent);
        }
        return result;
    }

    // 모든 향수들과 유사도를 계산하는 함수
    public List<PerfumeWeight> caclulate(List<Double> userPerfumeVector){
        List<PerfumeWeight> result = new ArrayList<>();
        // 1. 모든 향수를 불러오기
        List<Perfume> allPerfume = perfumeRepository.findAll();
        List<PerfumeDto> allPerfumeDto = perfumeMapper.toDto(allPerfume);
        // 2. 각 향수와 유저 벡터와 곱하여 계산하고 결과 데이터에 추가
        for(PerfumeDto perfume : allPerfumeDto) {
            double sum = 0.0;
            // 향수를 리스트로 변환
            List<Double> accordPercent = sumAccordWeight(perfume.getAccord());
            for(int i=0; i<=userPerfumeVector.size(); i++){
                sum += accordPercent.get(i)*userPerfumeVector.get(i);
            }
            result.add(new PerfumeWeight(perfume,sum));
        }
        // 3. 결과데이터를 유사도를 기준으로 정렬
        Collections.sort(result);

        return result;
    }

}
