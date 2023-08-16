package com.eightlow.decalcomanie.user.repository;

import com.eightlow.decalcomanie.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserId(String followed);

    User findByNickname(String nickname);
}
