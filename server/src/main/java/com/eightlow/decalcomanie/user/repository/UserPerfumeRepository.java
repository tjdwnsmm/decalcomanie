package com.eightlow.decalcomanie.user.repository;

import com.eightlow.decalcomanie.user.entity.UserPerfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPerfumeRepository extends JpaRepository<UserPerfume, Integer> {
    List<UserPerfume> findAll();

    List<UserPerfume> findByUser_UserId(String userId);

    void deleteAllByUser_UserId(String userId);
}
