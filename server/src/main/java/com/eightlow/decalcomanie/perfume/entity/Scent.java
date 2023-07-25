package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Builder(toBuilder = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Scent {

    @Id
    @Column(name = "scentId")
    private int scentId;

    @Column(name = "name")
    private String name;

    @Column(name = "rgb")
    private String rgb;
}
