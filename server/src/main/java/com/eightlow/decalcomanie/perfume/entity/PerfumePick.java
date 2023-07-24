package com.eightlow.decalcomanie.perfume.entity;

import com.eightlow.decalcomanie.perfume.dto.request.PerfumePickRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(PerfumePickRequest.class)
@AllArgsConstructor
@NoArgsConstructor
public class PerfumePick {
    @Id
    private String userId;

    @Id
    private int perfumeId;
}
