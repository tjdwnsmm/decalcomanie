package com.eightlow.decalcomanie.perfume.controller;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.dto.request.PerfumeSearchRequest;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/perfume")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PerfumeApiController {

    private final IPerfumeService perfumeService;

    // 향수 검색
    @PostMapping("/search")
    public ResponseEntity<List<PerfumeDto>> searchPerfume(@RequestBody PerfumeSearchRequest request) {
        List<PerfumeDto> perfumes = perfumeService.findMatchingPerfumes(request);
        
        return new ResponseEntity<>(perfumes, HttpStatus.OK);
    }

    // 향수 상세보기
    @GetMapping("/detail/{perfumeId}")
    public ResponseEntity<PerfumeDto> perfumeDetail(@PathVariable("perfumeId") int perfumeId, HttpServletRequest req) {
        if(!perfumeService.isExistingPerfume(perfumeId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        PerfumeDto perfumeDto = perfumeService.getPerfume(perfumeId);

        if(perfumeDto != null) {
            PerfumeDto pdto = perfumeDto.toBuilder()
                    .picked(perfumeService.isPickedPerfume(perfumeId, (String)req.getAttribute("userId")))
                    .build();
            return new ResponseEntity<>(pdto, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // 전체 브랜드 호출
    @GetMapping("/search/brand")
    public ResponseEntity<List<BrandDto>> getAllBrand() {
        List<BrandDto> brandList = perfumeService.findAllBrand();

        if(brandList != null) {
            return new ResponseEntity<>(brandList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 전체 향 호출
    @GetMapping("/search/scent")
    public ResponseEntity<List<ScentDto>> getAllScent() {
        List<ScentDto> scentList = perfumeService.findAllScent();

        if(scentList != null) {
            return new ResponseEntity<>(scentList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 향수 찜, 찜 해제
    @PostMapping("/pick")
    public ResponseEntity<Map<String, Boolean>> pick(@RequestBody Map<String, Integer> request, HttpServletRequest req) {
        if(!perfumeService.isExistingPerfume(request.get("perfumeId"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("isPicked", perfumeService.pickPerfume((String)req.getAttribute("userId"), request.get("perfumeId")));

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    // 찜한 향수 보기
    @GetMapping("/picked")
    public ResponseEntity<List<PerfumeDto>> picked(HttpServletRequest req) {
        return new ResponseEntity<>(perfumeService.findAllPickedPerfume((String)req.getAttribute("userId")), HttpStatus.OK);
    }

}
