package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.dto.request.PerfumePickRequest;
import com.eightlow.decalcomanie.perfume.entity.PerfumePick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerfumePickRepository extends JpaRepository<PerfumePick, Integer> {

    PerfumePick findByUserIdAndPerfumeId(String userId, int articleId);

    void deleteByUserIdAndPerfumeId(String userId, int perfumeId);
}
