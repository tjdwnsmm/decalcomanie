package com.eightlow.decalcomanie.perfume.service.implement;

import com.eightlow.decalcomanie.perfume.dto.*;
import com.eightlow.decalcomanie.perfume.dto.request.PerfumeSearchRequest;
import com.eightlow.decalcomanie.perfume.entity.*;
import com.eightlow.decalcomanie.perfume.mapper.*;
import com.eightlow.decalcomanie.perfume.repository.*;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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
    private final NoteRepository noteRepository;
    private final PerfumePickRepository perfumePickRepository;
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
                .brandName(brandRepository.findOneByBrandId(pdto.getBrandId()).getName())
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
        List<Perfume> searchResult;

        if (scent == null) {
            searchResult = perfumeRepository.findPerfumesByBrandAndGenderAndKeyword(brand, gender, keyword);
        } else {
            // 먼저 사용자가 선택한 향을 accord로 가지고 있는 향수의 id를 받아온다
            for (int i = 0; i < scent.size(); i++) {
                List<Integer> result = accordRepository.findPerfumeIdsByScentId(scent.get(i));

                for (int j = 0; j < result.size(); j++) {
                    perfumeIds.add(result.get(j));
                }
            }
            // 나머지 조건에 맞는 향수를 DB에서 조회하여 받아온다
            searchResult = perfumeRepository.findPerfumesByPerfumeIdAndBrandAndGenderAndKeyword(perfumeIds, brand, gender, keyword);
        }

        List<PerfumeDto> searchedPerfumes = new ArrayList<>();

        for (Perfume p : searchResult) {
            // 각각의 향수에 대하여 scents와 noteList 정보를 추가해준다
            List<ScentDto> scents = createScentDto(p.getPerfumeId());
            List<NoteListDto> noteList = getNoteList(p.getPerfumeId());

            PerfumeDto pdto = perfumeMapper.toDto(p);

            PerfumeDto updatedDto = pdto.toBuilder()
                    .accord(scents)
                    .note(noteList)
                    .brandName(brandRepository.findOneByBrandId(p.getBrandId()).getName())
                    .build();

            searchedPerfumes.add(updatedDto);
        }

        return searchedPerfumes;
    }

    @Override
    public List<PerfumeDto> getAllPerfumes() {
        // 나머지 조건에 맞는 향수를 DB에서 조회하여 받아온다
        List<Perfume> searchResult = perfumeRepository.findAll();
        List<PerfumeDto> searchedPerfumes = new ArrayList<>();

        for (Perfume p : searchResult) {
            // 각각의 향수에 대하여 scents와 noteList 정보를 추가해준다
            List<ScentDto> scents = createScentDto(p.getPerfumeId());
            List<NoteListDto> noteList = getNoteList(p.getPerfumeId());

            PerfumeDto pdto = perfumeMapper.toDto(p);

            PerfumeDto updatedDto = pdto.toBuilder()
                    .accord(scents)
                    .note(noteList)
                    .brandName(brandRepository.findOneByBrandId(p.getBrandId()).getName())
                    .build();

            searchedPerfumes.add(updatedDto);
        }

        return searchedPerfumes;
    }

    @Override
    @Transactional
    public boolean pickPerfume(String userId, int perfumeId) {
        // 이미 같은 데이터가 있는지 확인
        PerfumePick existingPick = perfumePickRepository.findByUserIdAndPerfumeId(userId, perfumeId);

        // 같은 데이터가 이미 있으면 삭제하고, 없으면 새로 추가
        if (existingPick != null) {
            perfumePickRepository.deleteByUserIdAndPerfumeId(userId, perfumeId);
            updatePickCount(perfumeId, -1);
            return false;
        } else {
            PerfumePick newPick = new PerfumePick(userId, perfumeId);
            perfumePickRepository.save(newPick);
            updatePickCount(perfumeId, 1);
            return true;
        }
    }

    @Override
    public boolean isPickedPerfume(int perfumeId, String userId) {
        PerfumePick existingPick = perfumePickRepository.findByUserIdAndPerfumeId(userId, perfumeId);

        if (existingPick == null) return false;
        return true;
    }

    @Override
    public boolean isExistingPerfume(int perfumeId) {
        Perfume existingPerfume = perfumeRepository.findOneByPerfumeId(perfumeId);

        if (existingPerfume == null) return false;
        return true;
    }

    // 사용자가 찜한 향수 모두 조회
    @Override
    public List<PerfumeDto> findAllPickedPerfume(String userId) {
        System.out.println("userId : " + userId);

        List<PerfumePick> searchResult = perfumePickRepository.findByUserId(userId);

        List<PerfumeDto> searchedPerfumes = new ArrayList<>();

        for (PerfumePick p : searchResult) {
            // 각각의 향수에 대하여 scents와 noteList 정보를 추가해준다
            System.out.println("PerfumeId => " + p.getPerfumeId());
            Perfume perfume = perfumeRepository.findOneByPerfumeId(p.getPerfumeId());

            System.out.println("PERFUME => ");
            System.out.println(perfumeMapper.toDto(perfume));

            List<ScentDto> scents = createScentDto(perfume.getPerfumeId());
            List<NoteListDto> noteList = getNoteList(perfume.getPerfumeId());

            PerfumeDto pdto = perfumeMapper.toDto(perfume);

            PerfumeDto updatedDto = pdto.toBuilder()
                    .accord(scents)
                    .note(noteList)
                    .brandName(brandRepository.findOneByBrandId(perfume.getBrandId()).getName())
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
        for (AccordDto accord : accords) {
            ScentDto sdto = scentMapper.toDto(scentRepository.findOneByScentId(accord.getScentId()));
            sdto.builder().weight(accord.getWeight());
            scents.add(sdto);
        }

        return scents;
    }

    // Top, Middle, Base note의 정보를 불러와서 리스트 형태로 반환
    public List<NoteListDto> getNoteList(int perfumeId) {
        List<NoteListDto> noteLists = new ArrayList<>();

        for (NoteList note : noteListRepository.findAllByPerfumeId(perfumeId)) {
            NoteListDto noteList = noteListMapper.toDto(note);
            NoteListDto ndto = noteList.toBuilder()
                    .noteName(noteRepository.findOneByNoteId(note.getNoteId()).getName()).build();

            noteLists.add(ndto);
        }

        return noteLists;
    }

    public void updatePickCount(int perfumeId, int value) {
        Perfume perfume = perfumeRepository.findOneByPerfumeId(perfumeId);
        if (perfume != null) {
            int currentPick = perfume.getPick();

            Perfume updatedPerfume = perfume.toBuilder()
                    .pick(currentPick + value)
                    .build();
            perfumeRepository.save(updatedPerfume);
        }
    }
}
