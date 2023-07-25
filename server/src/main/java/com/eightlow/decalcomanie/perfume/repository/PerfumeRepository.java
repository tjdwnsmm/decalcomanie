package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Integer> {
    List<Perfume> findAll();

    Perfume findOneByPerfumeId(int perfumeId);

    // 검색 조건에 맞는 향수를 받아오는 메서드
    @Query("SELECT p FROM Perfume p WHERE p.perfumeId IN :perfumeIds AND p.brandId IN :brand AND p.gender = :gender AND p.nameOrg LIKE %:keyword%")
    List<Perfume> findPerfumesByPerfumeIdAndBrandAndGenderAndKeyword(List<Integer> perfumeIds, List<Integer> brand, int gender, String keyword);

    @Query("SELECT p FROM Perfume p WHERE p.brandId IN :brand AND p.gender = :gender AND p.nameOrg LIKE %:keyword%")
    List<Perfume> findPerfumesByBrandAndGenderAndKeyword(List<Integer> brand, int gender, String keyword);
}
