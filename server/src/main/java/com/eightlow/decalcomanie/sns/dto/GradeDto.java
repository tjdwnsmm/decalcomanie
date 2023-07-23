package com.eightlow.decalcomanie.sns.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class GradeDto {
    private String userId;
    private int perfumeId;
    private int rate;

}
