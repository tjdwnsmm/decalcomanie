package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class PerfumePickId implements Serializable {
    private String userId;
    private int perfume;
}