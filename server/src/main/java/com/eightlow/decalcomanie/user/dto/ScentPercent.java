package com.eightlow.decalcomanie.user.dto;

import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScentPercent implements Comparable<ScentPercent> {
    ScentDto first;
    double second;

    public ScentPercent(ScentDto first, double second) {
        super();
        this.first = first;
        this.second = second;
    }
    @Override
    public int compareTo(ScentPercent scentPercent){
        return Double.compare(this.second, scentPercent.second);
    }
}
