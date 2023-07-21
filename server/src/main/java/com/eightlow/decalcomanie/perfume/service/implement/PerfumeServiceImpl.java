package com.eightlow.decalcomanie.perfume.service.implement;

import com.eightlow.decalcomanie.perfume.dto.*;
import com.eightlow.decalcomanie.perfume.entity.Accord;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.entity.Scent;
import com.eightlow.decalcomanie.perfume.mapper.*;
import com.eightlow.decalcomanie.perfume.repository.*;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PerfumeServiceImpl implements IPerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final BrandRepository brandRepository;
    private final ScentRepository scentRepository;
    private final AccordRepository accordRepository;
    private final NoteListRepository noteListRepository;
    private final PerfumeMapper perfumeMapper;
    private final BrandMapper brandMapper;
    private final ScentMapper scentMapper;
    private final AccordMapper accordMapper;
    private final NoteListMapper noteListMapper;

    @Override   // id로 개별 향수 조회
    public PerfumeDto getPerfume(int perfumeId) {
        PerfumeDto pdto = perfumeMapper.toDto(perfumeRepository.findOneByPerfumeId(perfumeId));

        // scents 정보와 noteList 정보를 각각의 테이블에서 조회하여 가져온다
        List<ScentDto> scents = createScentDto(perfumeId);
        List<NoteListDto> noteList = getNoteList(perfumeId);

        // perfume 테이블의 정보와 scents, noteList 의 정보를 하나로 합친다
        PerfumeDto updatedDto = pdto.toBuilder()
                .accord(scents)
                .note(noteList)
                .build();

        return updatedDto;
    }

    @Override
    public List<BrandDto> findAllBrand() {
        return brandMapper.toDto(brandRepository.findAll());
    }

    @Override
    public List<ScentDto> findAllScent() {
        return scentMapper.toDto(scentRepository.findAll());
    }

    @Override   // 검색 조건에 맞는 향수 조회
    public List<PerfumeDto> findMatchingPerfumes(int gender, List<Integer> scent, String keyword, List<Integer> brand) {
        List<Integer> perfumeIds = new ArrayList<>();

        // 먼저 사용자가 선택한 향을 accord로 가지고 있는 향수의 id를 받아온다
        for (int i = 0; i < scent.size(); i++) {
            List<Integer> result = accordRepository.findPerfumeIdsByScentId(scent.get(i));

            for (int j = 0; j < result.size(); j++) {
                perfumeIds.add(result.get(j));
            }
        }

        // 나머지 조건에 맞는 향수를 DB에서 조회하여 받아온다
        List<Perfume> searchResult = perfumeRepository.findPerfumesByBrandAndGenderAndKeyword(perfumeIds, brand, gender, keyword);
        List<PerfumeDto> searchedPerfumes = new ArrayList<>();

        for(Perfume p : searchResult) {
            // 각각의 향수에 대하여 scents와 noteList 정보를 추가해준다
            List<ScentDto> scents = createScentDto(p.getPerfumeId());
            List<NoteListDto> noteList = getNoteList(p.getPerfumeId());

            PerfumeDto pdto = perfumeMapper.toDto(p);

            PerfumeDto updatedDto = pdto.toBuilder()
                    .accord(scents)
                    .note(noteList)
                    .build();

            searchedPerfumes.add(updatedDto);
        }

        return searchedPerfumes;
    }

    // accord 테이블의 향 정보와 scent 테이블의 향 정보를 response type에 맞는 형태로 합친다
    public List<ScentDto> createScentDto(int perfumeId) {
        List<AccordDto> accords = accordMapper.toDto(accordRepository.findAllByPerfumeId(perfumeId));

        List<ScentDto> scents = new ArrayList<>();

        // 향수의 향 계열 하나당 id, name, weight, rgb를 가져와서 하나의 Dto로 반환
        for(AccordDto accord : accords) {
            ScentDto sdto = scentMapper.toDto(scentRepository.findOneByScentId(accord.getScentId()));
            sdto.builder().weight(accord.getWeight());
            scents.add(sdto);
        }

        return scents;
    }

    // Top, Middle, Base note의 정보를 불러와서 리스트 형태로 반환
    public List<NoteListDto> getNoteList(int perfumeId) {
        List<NoteListDto> noteLists = noteListMapper.toDto(noteListRepository.findAllByPerfumeId(perfumeId));

        return noteLists;
    }
}
