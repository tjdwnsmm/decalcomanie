package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class ScentDto {
    private int scentId;

    private float weight;

    private String name;

    private String rgb;
}
