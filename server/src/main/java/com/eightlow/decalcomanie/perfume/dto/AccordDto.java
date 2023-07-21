package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;

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
