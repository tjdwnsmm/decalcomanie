package com.eightlow.decalcomanie.perfume.service;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.dto.request.PerfumeSearchRequest;
import com.eightlow.decalcomanie.perfume.entity.Scent;

import java.util.List;
import java.util.UUID;

public interface IPerfumeService {
    public PerfumeDto getPerfume(int perfumeId);

    public List<PerfumeDto> findAllPerfume();

    public List<BrandDto> findAllBrand();

    public List<ScentDto> findAllScent();

    List<PerfumeDto> findMatchingPerfumes(PerfumeSearchRequest condition);

    boolean pickPerfume(String userId, int perfumeId);

    boolean isPickedPerfume(int perfumeId, String userId);

    boolean isExistingPerfume(int perfumeId);

    List<PerfumeDto> findAllPickedPerfume(String userId);

    void updatePerfumeRate(int perfumeId, float rate);

    Scent getScentById(int scentId);
}
