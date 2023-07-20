package com.eightlow.decalcomanie.perfume.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BrandDto {
    private int brandId;

    private String name;
}
