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
public class Brand {

    @Id
    @Column(name = "brandId")
    private int perfumeId;

    @Column(name = "name")
    private String name;

}
