package com.eightlow.decalcomanie.perfume.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class PerfumePickRequest {
    private UUID userid;

    private int perfumeId;
}
