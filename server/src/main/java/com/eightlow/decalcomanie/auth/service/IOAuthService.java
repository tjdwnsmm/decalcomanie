package com.eightlow.decalcomanie.auth.service;

import com.eightlow.decalcomanie.auth.entity.UserCredential;
import com.eightlow.decalcomanie.user.entity.User;

public interface IOAuthService {
    public void register(UserCredential userCredential, User user);

    public UserCredential isMember(String email);

    public void signIn(UserCredential userCredential);

    void updateRefreshToken(String refreshToken, String userId);

    void signOut(String userId);

    void deleteUser(String userId);
}
