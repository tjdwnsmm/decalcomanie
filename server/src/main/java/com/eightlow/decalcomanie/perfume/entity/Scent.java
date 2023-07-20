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
//@Table(indexes = @Index(name = "idx_actor", columnList = "docId"))
public class Scent {

    @Id
    @Column(name = "scentId")
    private int scentId;

    @Column(name = "name")
    private String name;

    @Column(name = "rgb")
    private String rgb;
}
