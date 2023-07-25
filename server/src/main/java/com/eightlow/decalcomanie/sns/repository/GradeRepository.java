package com.eightlow.decalcomanie.sns.repository;

import com.eightlow.decalcomanie.sns.entity.Grade;
import com.eightlow.decalcomanie.sns.entity.pk.GradePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, GradePk> {
    Grade findByUserIdAndPerfumeId(String userId, int perfumeId);

    void deleteByUserIdAndPerfumeId(String userId, int perfumeId);
}
