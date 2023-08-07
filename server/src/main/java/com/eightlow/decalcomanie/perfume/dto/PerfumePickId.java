package com.eightlow.decalcomanie.perfume.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PerfumePickId implements Serializable {
    private String userId;
    private int perfume;
}