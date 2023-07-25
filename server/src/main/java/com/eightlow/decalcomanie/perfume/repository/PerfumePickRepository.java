package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.PerfumePick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfumePickRepository extends JpaRepository<PerfumePick, Integer> {

    PerfumePick findByUserIdAndPerfumeId(String userId, int perfumeId);

    void deleteByUserIdAndPerfumeId(String userId, int perfumeId);

    List<PerfumePick> findByUserId(String userId);
}
