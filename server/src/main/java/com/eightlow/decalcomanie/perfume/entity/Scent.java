package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Builder(toBuilder = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "scent")
public class Scent {

    @Id
    @Column(name = "scentId")
    private int scentId;

    @Column(name = "nameOrg")
    private String nameOrg;

    @Column(name = "rgb")
    private String rgb;

    @Column(name = "name")
    private String name;
}
