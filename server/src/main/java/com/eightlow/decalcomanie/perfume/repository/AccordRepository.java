package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.Accord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccordRepository extends JpaRepository<Accord, Integer> {
    List<Accord> findAll();

    Accord findOneByAccordId(int accordId);

    @Query("SELECT a.perfume.perfumeId FROM Accord a WHERE a.scent.scentId = :scentId")
    List<Integer> findPerfumeIdsByScentId(@Param(value="scentId") int scentId);

    List<Accord> findAllByPerfume_PerfumeId(int perfumeId);
}
