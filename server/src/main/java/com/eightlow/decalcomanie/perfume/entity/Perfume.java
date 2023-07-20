package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
//@Table(indexes = @Index(name = "idx_actor", columnList = "docId"))
public class Perfume {

    @Id
    @Column(name = "perfumeId")
    private int perfumeId;

    @Column(name = "name")
    private String name;

    @Column(name = "nameOrg")
    private String nameOrg;

    @Column(name = "brand")
    private String brand;

    @Column(name = "picture")
    private String picture;

    @Column(name = "gender")
    private int gender;

    @Column(name = "rate")
    private Float rate;

    @Column(name = "longevity")
    private float longevity;

    @Column(name = "sillage")
    private float sillage;

}
