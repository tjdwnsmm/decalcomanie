package com.eightlow.decalcomanie.user.dto;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder(toBuilder = true)
public class PerfumeWeight implements Comparable<PerfumeWeight>{
    PerfumeDto first;
    double second;

    public PerfumeWeight(PerfumeDto first, double second) {
        super();
        this.first = first;
        this.second = second;
    }
    @Override
    public int compareTo(PerfumeWeight perfumeWeight){
        return Double.compare(this.second, perfumeWeight.second);
    }
}
