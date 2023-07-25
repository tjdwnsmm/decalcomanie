package com.eightlow.decalcomanie.user.service.implement;

import com.eightlow.decalcomanie.user.entity.UserPerfume;
import com.eightlow.decalcomanie.user.repository.UserPerfumeRepository;
import com.eightlow.decalcomanie.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserPerfumeRepository userPerfumeRepository;

    @Override
    public void addUserPerfume(UserPerfume userPerfume) {
        userPerfumeRepository.save(userPerfume);
    }
}
