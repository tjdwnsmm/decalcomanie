package com.eightlow.decalcomanie.perfume.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScentDto {
    private int scentId;

    private String name;

    private String rgb;
}
