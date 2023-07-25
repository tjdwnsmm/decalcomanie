package com.eightlow.decalcomanie.perfume.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class PerfumeSearchRequest {
    private String keyword;

    private List<Integer> brand;

    private Integer gender;

    private List<Integer> scent;
}

