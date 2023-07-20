package com.eightlow.decalcomanie.perfume.service;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.entity.Perfume;

import java.util.List;

public interface IPerfumeService {
    public List<PerfumeDto> searchPerfume() throws Exception;

    public PerfumeDto getPerfume(int perfumeId);
}
