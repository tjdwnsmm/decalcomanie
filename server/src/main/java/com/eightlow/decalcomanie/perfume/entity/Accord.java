package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Accord {
    @Id
    @Column(name = "accordId")
    private int accordId;

    @Column(name = "weight")
    private float weight;

    @Column(name = "perfumeId")
    private int perfumeId;

    @Column(name = "scentId")
    private int scentId;
}

