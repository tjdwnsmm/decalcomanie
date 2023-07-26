package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.Accord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccordRepository extends JpaRepository<Accord, Integer> {
    List<Accord> findAll();

    Accord findOneByAccordId(int accordId);

    @Query("SELECT perfumeId FROM Accord WHERE scentId = :scentId")
    List<Integer> findPerfumeIdsByScentId(int scentId);

    List<Accord> findAllByPerfumeId(int perfumeId);
}