package com.eightlow.decalcomanie.user.repository;

import com.eightlow.decalcomanie.user.entity.UserPerfumeRecommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPerfumeRecommendRepository extends JpaRepository<UserPerfumeRecommend, Integer> {
    void deleteAllByUser_UserId(String userId);
}
