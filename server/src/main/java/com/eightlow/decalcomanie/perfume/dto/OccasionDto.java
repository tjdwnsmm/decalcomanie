package com.eightlow.decalcomanie.perfume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class OccasionDto {
    private String occasion;

    private float weight;
}
