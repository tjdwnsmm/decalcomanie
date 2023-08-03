package com.eightlow.decalcomanie.perfume.dto.request;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class PerfumePickRequest implements Serializable {
    private String userId;

    private int perfumeId;
}
