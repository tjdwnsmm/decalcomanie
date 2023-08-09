package com.eightlow.decalcomanie.user.service.implement;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.mapper.PerfumeMapper;
import com.eightlow.decalcomanie.perfume.mapper.ScentMapper;
import com.eightlow.decalcomanie.perfume.repository.PerfumeRepository;
import com.eightlow.decalcomanie.user.dto.PerfumeWeight;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import com.eightlow.decalcomanie.user.dto.UserPerfumeId;
import com.eightlow.decalcomanie.user.dto.response.FollowerResponse;
import com.eightlow.decalcomanie.user.dto.response.FollowingResponse;
import com.eightlow.decalcomanie.user.entity.Follow;
import com.eightlow.decalcomanie.user.entity.User;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import com.eightlow.decalcomanie.user.entity.UserScent;
import com.eightlow.decalcomanie.user.mapper.UserMapper;
import com.eightlow.decalcomanie.user.mapper.UserPerfumeMapper;
import com.eightlow.decalcomanie.user.repository.FollowRepository;
import com.eightlow.decalcomanie.user.repository.UserPerfumeRepository;
import com.eightlow.decalcomanie.user.repository.UserScentRepository;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final UserPerfumeRepository userPerfumeRepository;
    private final FollowRepository followRepository;
    private final UserScentRepository userScentRepository;
    private final UserMapper userMapper;
    private final ScentMapper scentMapper;
    private final PerfumeRepository perfumeRepository;
    private final PerfumeMapper perfumeMapper;
    private final EntityManager em;
    private final UserPerfumeMapper userPerfumeMapper;

    @Override
    public String modifyUserPerfume(String userId, int perfumeId) {
        UserPerfumeId up = UserPerfumeId.builder()
                .user(userId)
                .perfume(perfumeId)
                .build();

        UserPerfume userPerfume = em.find(UserPerfume.class, up);

        if(userPerfume == null) {
            User user = em.find(User.class, userId);
            Perfume perfume = em.find(Perfume.class, perfumeId);

            userPerfume = UserPerfume.builder()
                    .user(user)
                    .perfume(perfume)
                    .build();

            userPerfumeRepository.save(userPerfume);
            return "향수가 등록되었습니다";
        }

        userPerfumeRepository.delete(userPerfume);
        return "향수가 제거되었습니다";
    }

    @Override
    public List<PerfumeDto> getUserPerfume(String userId) {
        List<UserPerfume> userPerfumes = userPerfumeRepository.findByUser_UserId(userId);
        List<PerfumeDto> result = new ArrayList<>();

        for(UserPerfume perfume : userPerfumes) {
            result.add(perfumeMapper.toDto(perfume.getPerfume()));
        }

        return result;
    }

    // following = 팔로우 주체의 userId, followed = 팔로우를 할 사람의 userId
    @Override
    public String followUser(String following, String followed) {
        if(isFollowing(following, followed)) {
            followRepository.deleteByFollowingAndFollowed(following, followed);
            return "팔로우가 취소되었습니다";
        }

        Follow follow = Follow.builder()
                .following(following)
                .followed(followed)
                .build();

        followRepository.save(follow);
        return "팔로우가 완료되었습니다";
    }

    // 팔로잉 하고 있는 유저들의 정보를 가져온다
    @Override
    public List<FollowingResponse> getFollowingUsers(String userId) {
        // following 컬럼의 userId를 기준으로 조회
        List<Follow> myFollowing = followRepository.findByFollowing(userId);
        List<FollowingResponse> result = new ArrayList<>();

        if(myFollowing.size() > 0) {
            for(Follow follow : myFollowing) {
                // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보들을 가져온다.
                UserInfoDto userInfoDto = getUserInfo(follow.getFollowed());

                // 반환 포맷에 맞는 response 생성
                FollowingResponse response = FollowingResponse.builder()
                        .nickname(userInfoDto.getUser().getNickname())
                        .favorite(userInfoDto.getFavorities())
                        .hates(userInfoDto.getHates())
                        .picture(userInfoDto.getUser().getPicture())
                        .build();

                result.add(response);
            }
        }

        return result;
    }

    // 팔로워 목록 조회
    @Override
    public List<FollowerResponse> getFollowers(String userId) {
        System.out.println("getFollowers called");
        List<Follow> myFollower = followRepository.findByFollowed(userId);
        List<FollowerResponse> result = new ArrayList<>();

        if(myFollower.size() > 0) {
            for(Follow follow : myFollower) {
                System.out.println("getUserInfo called");
                // 사용자 정보와 좋아하는 향, 싫어하는 향의 정보들을 가져온다.
                UserInfoDto userInfoDto = getUserInfo(follow.getFollowing());

                // 반환 포맷에 맞는 response 생성
                FollowerResponse response = FollowerResponse.builder()
                        .nickname(userInfoDto.getUser().getNickname())
                        .favorite(userInfoDto.getFavorities())
                        .hates(userInfoDto.getHates())
                        .picture(userInfoDto.getUser().getPicture())
                        .isFollowing(isFollowing(userId, userInfoDto.getUser().getUserId()))
                        .build();

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
        User user = em.find(User.class, userId);

        List<ScentDto> favorite = new ArrayList<>();
        List<ScentDto> hate = new ArrayList<>();

        // userScent 테이블에서 팔로잉 하고 있는 사람의 좋아하는 향, 싫어하는 향을 조회
        List<UserScent> userScentList = userScentRepository.findUserScentByUser_UserId(userId);

        if(userScentList != null) {
            for (UserScent userScent : userScentList) {
                if(userScent.getStatus().getValue().equals("FAVORITE")) {
                    favorite.add(scentMapper.toDto(userScent.getScent()));
                } else if(userScent.getStatus().getValue().equals("HATE")) {
                    hate.add(scentMapper.toDto(userScent.getScent()));
                }
            }
        }

        return UserInfoDto.builder()
                .user(userMapper.toDto(user))
                .favorities(favorite)
                .hates(hate)
                .build();
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

    // 사용자 개인 추천 향수
    @Override
    public List<PerfumeDto> recommendUserPerfume(String userId) {
        // 사용자 향 단위 벡터 계산
        Map<ScentDto,Double> userPerfumeVector = userAccordVector(userId);

        System.out.println("사용자 향 단위 벡터");
        System.out.print("[");
        for( ScentDto scentDto : userPerfumeVector.keySet()){
            System.out.print(scentDto.getName()+":"+userPerfumeVector.get(scentDto)+",");
        }
        System.out.println("]");

        // 사용자가 보유하지 않은 모든 향수들에 대한 향수 단위 벡터 계산
        Map<PerfumeDto,Map<ScentDto,Double>> allPerfumeVector = allAccordVector(userId);

        System.out.println("사용자가 보유하지 않은 향수의 향 단위 벡터");
        for( PerfumeDto perfumeDto : allPerfumeVector.keySet()){
            System.out.println("["+perfumeDto.getName()+"]");
            System.out.print("[");
            Map<ScentDto,Double> scentPercent = allPerfumeVector.get(perfumeDto);
            for(ScentDto scentDto : scentPercent.keySet()){
                System.out.print(scentDto.getName()+":"+scentPercent.get(scentDto)+",");
            }
            System.out.println("]");
        }

        // 사용자 향 단위 벡터를 모든 향수 향 단위 벡터와 유사도 계산
        List<PerfumeWeight> result = calculateSimilarity(userPerfumeVector,allPerfumeVector);
        // Percentage로 정렬
        Collections.sort(result);
        // 탑 10 추출
        List<PerfumeDto> perfumeList = new ArrayList<>();
        for (PerfumeWeight pair : result) {
            perfumeList.add(pair.getFirst());
        }
        // result의 상단 10개하여 반환
        return perfumeList.subList(0, Math.min(result.size(),10));
    }

    // 사용자 향 단위 벡터와 모든 향수 향 단위 벡터와 유사도 계산
    private List<PerfumeWeight> calculateSimilarity(Map<ScentDto, Double> userPerfumeVector, Map<PerfumeDto, Map<ScentDto, Double>> allPerfumeVector) {
        List<PerfumeWeight> result = new ArrayList<>();
        for(PerfumeDto perfumeDto: allPerfumeVector.keySet()){
            Map<ScentDto, Double> perfumePercent = allPerfumeVector.get(perfumeDto);
            double similarity = 0.0;
            for(ScentDto scentDto :userPerfumeVector.keySet()){
                similarity += userPerfumeVector.get(scentDto)*perfumePercent.get(scentDto);
            }
            result.add(new PerfumeWeight(perfumeDto,similarity));
        }
        return result;
    }

    // 유저가 보유한 향수들을 제외하고 향 단위 벡터를 계산하는 로직
    public Map<PerfumeDto, Map<ScentDto, Double>> allAccordVector(String userId) {
        Map<PerfumeDto, Map<ScentDto, Double>> result = new HashMap<>();
        List<Perfume> allPerfume = perfumeRepository.findAll();
        List<PerfumeDto> allPerfumeDto = perfumeMapper.toDto(allPerfume);

        for(PerfumeDto perfumeDto : allPerfumeDto){
            List<UserPerfume> userPerfumes = userPerfumeRepository.findByUser_UserId(userId);
            List<UserPerfumeDto> userPerfumesDto = userPerfumeMapper.toDto(userPerfumes);
            if(userPerfumesDto.contains(perfumeDto)) continue;
            Map<ScentDto, Double> scentPercent = calculate(perfumeDto);
            result.put(perfumeDto,scentPercent);
        }
        return result;
    }

    // 향수 하나에 대하여 향수 단위 벡터를 만드는 메소드
    private Map<ScentDto, Double> calculate(PerfumeDto perfumeDto) {
        Map<ScentDto, Double> result = new HashMap<>();
        List<ScentDto> accordList = perfumeDto.getAccord();
        int sum = sumScentWeight(accordList);
        for(ScentDto scentDto : accordList) {
            double percent = (double) scentDto.getWeight()/(double) sum;
            result.put(scentDto,percent);
        }
        return result;
    }

    // 사용자 향 단뒤 벡터 계산
    public Map<ScentDto,Double> userAccordVector(String userId) {
        // 사용자가 보유하고 있는 향수의 향들에대한 퍼센트 Map 생성
        Map<ScentDto,Double> userScentPercent = new HashMap<>();

        // 사용자가 보유하고 있는 향수 정보를 가져온다.
        List<UserPerfume> userPerfumes = userPerfumeRepository.findByUser_UserId(userId);
        int userPerfumeNum = userPerfumes.size(); // 사용자가 보유한 향수 개수

        // 사용자의 향수 x 향 테이블 계산
        // 사용자가 보유하고 있는 향수
        for(UserPerfume userPerfume : userPerfumes) {
            PerfumeDto perfumeDto = perfumeMapper.toDto(userPerfume.getPerfume());
            List<ScentDto> accordList = perfumeDto.getAccord();
            int sumScent = sumScentWeight(accordList);
            for(ScentDto scentDto : accordList){
                Double scentPercent = (double) scentDto.getWeight() / (double) sumScent;
                if(userScentPercent.containsKey(scentDto)){
                    double percent = userScentPercent.get(scentDto) + scentPercent;
                    userScentPercent.put(scentDto,percent);
                }else{
                    userScentPercent.put(scentDto,scentPercent);
                }
            }
        }

        // userScentPercent를 단위벡터로 변경
        for( ScentDto scentDto : userScentPercent.keySet()){
            double percent = userScentPercent.get(scentDto)/ (double) userPerfumeNum;
            userScentPercent.put(scentDto,percent);
        }

        return userScentPercent;
    }

    // 향수 향의 가중치의 합을 반환해주는 메소드
    private int sumScentWeight(List<ScentDto> accordList) {
        int sum = 0;
        for(ScentDto scentDto : accordList){
            sum += scentDto.getWeight();
        }
        return sum;
    }

}
