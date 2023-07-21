package com.eightlow.decalcomanie.perfume.service;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;

import java.util.List;

public interface IPerfumeService {
    public PerfumeDto getPerfume(int perfumeId);

    public List<BrandDto> findAllBrand();

    public List<ScentDto> findAllScent();

    List<PerfumeDto> findMatchingPerfumes(int gender, List<Integer> scent, String keyword, List<Integer> brand);
}
