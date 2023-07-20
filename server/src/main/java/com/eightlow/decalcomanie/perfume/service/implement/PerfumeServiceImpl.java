package com.eightlow.decalcomanie.perfume.service.implement;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.mapper.PerfumeMapper;
import com.eightlow.decalcomanie.perfume.repository.PerfumeRepository;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PerfumeServiceImpl implements IPerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeMapper perfumeMapper;

    @Override
    public List<PerfumeDto> searchPerfume() throws Exception {
        return null;
    }

    @Override
    public PerfumeDto getPerfume(int perfumeId) {
        return perfumeMapper.toDto(perfumeRepository.findOneByPerfumeId(perfumeId));
    }
}
