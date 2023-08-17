package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.PerfumePick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfumePickRepository extends JpaRepository<PerfumePick, Integer> {
    void deleteAllByUser_UserId(String userId);
}
