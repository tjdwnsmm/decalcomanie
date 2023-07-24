package com.eightlow.decalcomanie.perfume.controller;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.dto.request.PerfumePickRequest;
import com.eightlow.decalcomanie.perfume.dto.request.PerfumeSearchRequest;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/perfume")
@RequiredArgsConstructor
public class PerfumeApiController {

    private final IPerfumeService perfumeService;

    @PostMapping("/search")
    public ResponseEntity<List<PerfumeDto>> searchPerfume(@RequestBody(required = false) PerfumeSearchRequest request) {
        if(request == null) {
            List<PerfumeDto> perfumes = perfumeService.getAllPerfumes();
            return new ResponseEntity<>(perfumes, HttpStatus.OK);
        }

        List<PerfumeDto> perfumes = perfumeService.findMatchingPerfumes(request.getGender(), request.getScent(), request.getKeyword(), request.getBrand());

        return new ResponseEntity<>(perfumes, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<PerfumeDto> perfumeDetail(@PathVariable int id) {
        PerfumeDto perfumeDto = perfumeService.getPerfume(id);

        if(perfumeDto != null) {
            return new ResponseEntity<>(perfumeDto, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search/brand")
    public ResponseEntity<List<BrandDto>> getAllBrand() {
        List<BrandDto> brandList = perfumeService.findAllBrand();

        if(brandList != null) {
            return new ResponseEntity<>(brandList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/search/scent")
    public ResponseEntity<List<ScentDto>> getAllScent() {
        List<ScentDto> scentList = perfumeService.findAllScent();

        if(scentList != null) {
            return new ResponseEntity<>(scentList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/pick")
    public ResponseEntity<Map<String, Boolean>> pick(@RequestBody PerfumePickRequest request) {
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("isPicked", perfumeService.pick(request.getUserId(), request.getPerfumeId()));

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

}
