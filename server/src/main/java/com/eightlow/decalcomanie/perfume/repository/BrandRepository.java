package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    List<Brand> findAll();
}
