package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class AccordDto {
    private int accordId;

    private float weight;

    private int perfumeId;

    private int scentId;
}
