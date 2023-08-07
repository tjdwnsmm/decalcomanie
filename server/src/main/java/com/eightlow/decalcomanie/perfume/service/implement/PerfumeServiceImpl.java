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
    private final PerfumePickRepository perfumePickRepository;
    private final PerfumeMapper perfumeMapper;
    private final BrandMapper brandMapper;
    private final ScentMapper scentMapper;
    private final JPAQueryFactory queryFactory;

    // id로 개별 향수 조회
    @Override
    public PerfumeDto getPerfume(int perfumeId) {
        return perfumeMapper.toDto(perfumeRepository.findOneByPerfumeId(perfumeId));
    }

    @Override
    public List<PerfumeDto> findAllPerfume() { return perfumeMapper.toDto(perfumeRepository.findAll()); }

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
        List<Perfume> searchResult = queryFactory
                .selectFrom(perfume)
                .where(
                        scentEq(condition.getScent()),
                        brandEq(condition.getBrand()),
                        genderEq(condition.getGender()),
                        keywordEq(condition.getKeyword())
                )
                .fetch();

        return perfumeMapper.toDto(searchResult);
    }

    // 향수 찜
    @Override
    @Transactional
    public boolean pickPerfume(String userId, int perfumeId) {
        Perfume perfume = perfumeRepository.findOneByPerfumeId(perfumeId);

        // 이미 같은 데이터가 있는지 확인
        PerfumePick existingPick = perfumePickRepository.findByUserIdAndPerfume_PerfumeId(userId, perfume.getPerfumeId());

        // 같은 데이터가 이미 있으면 삭제하고, 없으면 새로 추가
        if (existingPick != null) {
            perfumePickRepository.deleteByUserIdAndPerfume_PerfumeId(userId, perfume.getPerfumeId());
            updatePickCount(perfume.getPerfumeId(), -1);
            return false;
        } else {
            PerfumePick newPick = new PerfumePick(userId, perfume);
            perfumePickRepository.save(newPick);
            updatePickCount(perfume.getPerfumeId(), 1);
            return true;
        }
    }

    // 이미 찜한 향수인지 체크
    @Override
    public boolean isPickedPerfume(int perfumeId, String userId) {
        PerfumePick existingPick = perfumePickRepository.findByUserIdAndPerfume_PerfumeId(userId, perfumeId);

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
            Perfume perfume = p.getPerfume();
            searchedPerfumes.add(perfumeMapper.toDto(perfume));
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
