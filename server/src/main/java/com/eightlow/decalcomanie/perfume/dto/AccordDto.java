package com.eightlow.decalcomanie.perfume.dto;

import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.entity.Scent;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class AccordDto {
    private int accordId;

    private float weight;

    private Perfume perfume;

    private Scent scent;
}
