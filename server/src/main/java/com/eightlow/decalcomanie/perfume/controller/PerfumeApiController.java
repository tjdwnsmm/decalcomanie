package com.eightlow.decalcomanie.perfume.controller;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.service.IPerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perfume")
@RequiredArgsConstructor
public class PerfumeApiController {

    private final IPerfumeService perfumeService;

    @GetMapping("/search/{id}")
    public PerfumeDto perfumeDetail(@PathVariable String id) {
        int perfumeId = Integer.parseInt(id);

        System.out.println("search/" + perfumeId);

        PerfumeDto perfumeDto = perfumeService.getPerfume(perfumeId);

        if(perfumeDto != null) {
            System.out.println(perfumeDto.toString());
        }

        return perfumeDto;
    }

}
