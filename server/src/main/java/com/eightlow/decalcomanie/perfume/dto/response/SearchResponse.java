package com.eightlow.decalcomanie.perfume.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class SearchResponse {
    boolean isLastPage;
    List<PerfumeDto> searchedPerfumes;
}
