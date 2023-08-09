package com.eightlow.decalcomanie.perfume.dto;

import com.eightlow.decalcomanie.perfume.entity.Brand;
import lombok.*;

import java.util.List;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class PerfumeDto {
    private int perfumeId;

    private String name;

    private String nameOrg;

    private String brandNameOrg;

    private String brandName;

    private int brandId;

    private String picture;

    private int gender;

    private Float rate;

    private float longevity;

    private float sillage;

    private boolean picked;

    private int pick;

    private float spring;

    private float summer;

    private float fall;

    private float winter;

    private float day;

    private float night;

    private List<ScentDto> accord;

    private List<NoteListDto> note;

}
