package com.eightlow.decalcomanie.perfume.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class OccasionRecommendResponse {
    private List<PerfumeDto> weather;
    private List<PerfumeDto> dayNight;
    private List<PerfumeDto> ageGender;
    private List<PerfumeDto> overall;
}
