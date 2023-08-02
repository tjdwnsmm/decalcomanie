package com.eightlow.decalcomanie.auth.service.implement;

import com.eightlow.decalcomanie.auth.entity.UserCredential;
import com.eightlow.decalcomanie.auth.respository.OAuthRepository;
import com.eightlow.decalcomanie.auth.service.IOAuthService;
import com.eightlow.decalcomanie.user.entity.User;
import com.eightlow.decalcomanie.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements IOAuthService {

    private final OAuthRepository oAuthRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void register(UserCredential userCredential, User user) {
        oAuthRepository.save(userCredential);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserCredential isMember(String email) {
        return oAuthRepository.findByEmail(email);
    }

    @Override
    public void signIn(UserCredential userCredential) {
        oAuthRepository.save(userCredential);
    }

    @Override
    @Transactional
    public void updateRefreshToken(String refreshToken, String userId) {
        UserCredential userCredential = oAuthRepository.findByUserId(userId);

        UserCredential reissueUser = userCredential.toBuilder()
                .refreshToken(refreshToken)
                .build();

        oAuthRepository.save(reissueUser);
    }

    @Override
    @Transactional
    public void signOut(String userId) {
        UserCredential userCredential = oAuthRepository.findByUserId(userId);
        UserCredential signOutUser = userCredential.toBuilder()
                .refreshToken("")
                .build();

        oAuthRepository.save(signOutUser);
    }

    @Override
    @Transactional
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
        oAuthRepository.deleteById(userId);
    }
}
