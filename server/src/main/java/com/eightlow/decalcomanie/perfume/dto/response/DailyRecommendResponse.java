package com.eightlow.decalcomanie.perfume.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class DailyRecommendResponse {
    private List<PerfumeDto> season;
    private List<PerfumeDto> dayNight;
    private List<PerfumeDto> ageGender;
    private List<PerfumeDto> overall;
    private String curSeason;
    private String curTime;
    private int gender;
    private int age;
}
