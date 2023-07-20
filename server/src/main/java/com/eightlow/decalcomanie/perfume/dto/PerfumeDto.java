package com.eightlow.decalcomanie.perfume.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PerfumeDto {
    private int perfumeId;

    private String name;

    private String nameOrg;

    private String brand;

    private String picture;

    private int gender;

    private Float rate;

    private float longevity;

    private float sillage;
}
