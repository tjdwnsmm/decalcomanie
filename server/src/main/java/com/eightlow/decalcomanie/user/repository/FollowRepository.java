package com.eightlow.decalcomanie.user.repository;

import com.eightlow.decalcomanie.user.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {

    Follow findByFollowingAndFollowed(String following, String followed);

    void deleteByFollowingAndFollowed(String following, String followed);

    List<Follow> findByFollowing(String following);

    List<Follow> findByFollowed(String followed);
}
