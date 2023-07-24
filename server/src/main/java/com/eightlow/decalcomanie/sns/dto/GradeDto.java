package com.eightlow.decalcomanie.sns.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class GradeDto {
    private UUID userId;
    private int perfumeId;
    private int rate;

}
