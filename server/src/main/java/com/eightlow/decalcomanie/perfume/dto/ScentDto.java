package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

import java.util.Objects;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class ScentDto {
    private int scentId;

    private float weight;

    private String nameOrg;

    private String name;

    private String rgb;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScentDto scentDto = (ScentDto) o;
        return scentId == scentDto.scentId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(scentId);
    }
}
