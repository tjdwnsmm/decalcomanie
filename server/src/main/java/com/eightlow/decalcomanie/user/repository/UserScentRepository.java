package com.eightlow.decalcomanie.user.repository;

import com.eightlow.decalcomanie.user.entity.Follow;
import com.eightlow.decalcomanie.user.entity.UserScent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserScentRepository extends JpaRepository<UserScent, Integer>  {
    @Query("SELECT us FROM UserScent us WHERE us.userId = :userId")
    List<UserScent> findAllUserScentByUserId(String userId);
}
