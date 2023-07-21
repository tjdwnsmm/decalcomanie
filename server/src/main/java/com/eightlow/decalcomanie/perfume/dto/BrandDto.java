package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {
    private int brandId;

    private String name;
}
