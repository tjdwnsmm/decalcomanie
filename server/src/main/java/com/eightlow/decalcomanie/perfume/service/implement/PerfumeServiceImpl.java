package com.eightlow.decalcomanie.perfume.service.implement;

import com.eightlow.decalcomanie.perfume.dto.*;
import com.eightlow.decalcomanie.perfume.dto.request.PerfumeSearchRequest;
import com.eightlow.decalcomanie.perfume.entity.*;
import com.eightlow.decalcomanie.perfume.mapper.*;
import com.eightlow.decalcomanie.perfume.repository.*;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static com.eightlow.decalcomanie.perfume.entity.QPerfume.perfume;

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
    private final JPAQueryFactory queryFactory;

    // id로 개별 향수 조회
    @Override
    public PerfumeDto getPerfume(int perfumeId) {
        return mergePerfumeDetails(perfumeRepository.findOneByPerfumeId(perfumeId));
    }

    // 전체 브랜드 조회
    @Override
    public List<BrandDto> findAllBrand() {
        return brandMapper.toDto(brandRepository.findAll());
    }

    // 전체 향 조회
    @Override
    public List<ScentDto> findAllScent() {
        return scentMapper.toDto(scentRepository.findAll());
    }

    // 검색 조건에 맞는 향수 조회
    @Override
    public List<PerfumeDto> findMatchingPerfumes(PerfumeSearchRequest condition) {
        System.out.println("최초 함수 콜 : " + System.currentTimeMillis());

        List<Perfume> searchResult = queryFactory
                .selectFrom(perfume)
                .where(
                        scentEq(condition.getScent()),
                        brandEq(condition.getBrand()),
                        genderEq(condition.getGender()),
                        keywordEq(condition.getKeyword())
                )
                .fetch();

        System.out.println("키워드 검색 완료 후 : " + System.currentTimeMillis());

        return getPerfumeDtosFrom(searchResult);
    }

    // 검색 결과로 받아온 향수들의 부족한 정보를 채워서 완성된 Dto 리스트로 반환
    private List<PerfumeDto> getPerfumeDtosFrom(List<Perfume> searchResult) {
        List<PerfumeDto> searchedPerfumes = new ArrayList<>();

        System.out.println("향수 추가정보 채우기 전 : " + System.currentTimeMillis());

        for (Perfume p : searchResult) {
            searchedPerfumes.add(mergePerfumeDetails(p));
        }

        System.out.println("향수 추가정보 채운 후 : " + System.currentTimeMillis());

        return searchedPerfumes;
    }

    // 각각의 향수에 대하여 scents와 noteList 정보를 추가해준다
    private PerfumeDto mergePerfumeDetails(Perfume perfume) {
        System.out.println("향 계열과 노트 정보, 브랜드 정보 채우기 전 : " + System.currentTimeMillis());

        List<ScentDto> scents = createScentDto(perfume.getPerfumeId());
        List<NoteListDto> noteList = getNoteList(perfume.getPerfumeId());

        PerfumeDto pdto = perfumeMapper.toDto(perfume);

        Brand brand = brandRepository.findOneByBrandId(perfume.getBrandId());

        System.out.println("향 계열과 노트 정보, 브랜드 정보 채운 후 : " + System.currentTimeMillis());

        PerfumeDto updatedDto = pdto.toBuilder()
                .accord(scents)
                .note(noteList)
                .brandNameOrg(brand.getNameOrg())
                .brandName(brand.getName())
                .build();

        return updatedDto;
    }

    // 향수 찜
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

    // 이미 찜한 향수인지 체크
    @Override
    public boolean isPickedPerfume(int perfumeId, String userId) {
        PerfumePick existingPick = perfumePickRepository.findByUserIdAndPerfumeId(userId, perfumeId);

        if (existingPick == null) return false;
        return true;
    }

    // DB에 존재하는 향수인지 체크
    @Override
    public boolean isExistingPerfume(int perfumeId) {
        Perfume existingPerfume = perfumeRepository.findOneByPerfumeId(perfumeId);

        if (existingPerfume == null) return false;
        return true;
    }

    // 사용자가 찜한 향수 모두 조회
    @Override
    public List<PerfumeDto> findAllPickedPerfume(String userId) {
        List<PerfumePick> searchResult = perfumePickRepository.findByUserId(userId);
        List<PerfumeDto> searchedPerfumes = new ArrayList<>();

        for (PerfumePick p : searchResult) {
            // 각각의 향수에 대하여 scents와 noteList 정보를 추가해준다
            Perfume perfume = perfumeRepository.findOneByPerfumeId(p.getPerfumeId());
            searchedPerfumes.add(mergePerfumeDetails(perfume));
        }

        return searchedPerfumes;
    }

    // 향수 평점 업데이트
    @Override
    public void updatePerfumeRate(int perfumeId, float rate) {
        Perfume perfume = perfumeRepository.findOneByPerfumeId(perfumeId);
        Perfume updatedPerfume = perfume.toBuilder()
                .rate(rate)
                .build();

        perfumeRepository.save(updatedPerfume);
    }

    // 향 정보를 가져오기
    @Override
    public Scent getScentById(int scentId) {
        return scentRepository.findOneByScentId(scentId);
    }

    // accord 테이블의 향 정보와 scent 테이블의 향 정보를 response type에 맞는 형태로 합친다
    public List<ScentDto> createScentDto(int perfumeId) {
        List<AccordDto> accords = accordMapper.toDto(accordRepository.findAllByPerfumeId(perfumeId));

        List<ScentDto> scents = new ArrayList<>();

        // 향수의 향 계열 하나당 id, name, weight, rgb를 가져와서 하나의 Dto로 반환
        for (AccordDto accord : accords) {
            ScentDto sdto = scentMapper.toDto(scentRepository.findOneByScentId(accord.getScentId()));
            ScentDto scentDto = sdto.toBuilder()
                    .weight(accord.getWeight())
                    .build();

            scents.add(scentDto);
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

    // 향수 찜 또는 찜 해제 시에 향수 전체 찜 개수에 반영
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

    private BooleanExpression keywordEq(String keyword) {
        return StringUtils.hasText(keyword) ? perfume.nameOrg.containsIgnoreCase(keyword).or(perfume.name.containsIgnoreCase(keyword)) : null;
    }

    private BooleanExpression brandEq(List<Integer> brand) {
        return brand.size() > 0 ? perfume.brandId.in(brand) : null;
    }

    private BooleanExpression genderEq(List<Integer> gender) {
        return gender.size() > 0 ? perfume.gender.in(gender) : null;
    }

    private BooleanExpression scentEq(List<Integer> scent) {
        if(scent.size() > 0) {
            List<Integer> perfumeIds = new ArrayList<>();

            // 먼저 사용자가 선택한 향을 accord로 가지고 있는 향수의 id를 받아온다
            for (int i = 0; i < scent.size(); i++) {
                List<Integer> result = accordRepository.findPerfumeIdsByScentId(scent.get(i));

                for (int j = 0; j < result.size(); j++) {
                    perfumeIds.add(result.get(j));
                }
            }

            return perfume.perfumeId.in(perfumeIds);
        }

        return null;
    }

}
