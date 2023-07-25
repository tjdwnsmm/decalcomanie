package com.eightlow.decalcomanie.user.service.implement;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
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
    private final IPerfumeService perfumeService;

    @Override
    public String modifyUserPerfume(UserPerfume userPerfume) {
        UserPerfume u = userPerfumeRepository.findByUserIdAndPerfumeId(userPerfume.getUserId(), userPerfume.getPerfumeId());

        if(u == null) {
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
}
