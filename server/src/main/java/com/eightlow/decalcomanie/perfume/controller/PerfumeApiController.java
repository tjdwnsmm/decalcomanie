package com.eightlow.decalcomanie.perfume.controller;

import com.eightlow.decalcomanie.perfume.dto.BrandDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/perfume")
@RequiredArgsConstructor
public class PerfumeApiController {

    private final IPerfumeService perfumeService;

    @GetMapping("/search/{id}")
    public PerfumeDto perfumeDetail(@PathVariable String id) {
        int perfumeId = Integer.parseInt(id);

        PerfumeDto perfumeDto = perfumeService.getPerfume(perfumeId);

        if(perfumeDto != null) {
            System.out.println(perfumeDto.toString());
        }

        return perfumeDto;
    }

    @GetMapping("/search/brand")
    public List<BrandDto> getAllBrand() {
        List<BrandDto> brandList = perfumeService.findAllBrand();

        if(brandList != null) {
            System.out.println(brandList.toString());
        }

        return brandList;
    }

    @GetMapping("/search/scent")
    public List<ScentDto> getAllScent() {
        List<ScentDto> scentList = perfumeService.findAllScent();

        if(scentList != null) {
            System.out.println(scentList.toString());
        }

        return scentList;
    }

}
