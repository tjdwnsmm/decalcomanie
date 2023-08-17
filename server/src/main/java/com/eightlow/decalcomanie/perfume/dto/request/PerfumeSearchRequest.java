package com.eightlow.decalcomanie.perfume.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerfumeSearchRequest {
    private String keyword;

    private List<Integer> brand;

    private List<Integer> gender;

    private List<Integer> scent;

    private Integer dataSize;

    private Integer lastPick;

    private Integer lastPerfumeId;

    private Integer orderType;
}

