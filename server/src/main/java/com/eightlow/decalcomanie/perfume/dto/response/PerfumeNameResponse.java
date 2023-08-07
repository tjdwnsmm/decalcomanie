package com.eightlow.decalcomanie.perfume.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
public class PerfumeNameResponse {
    private String name;
    private String nameOrg;
}
