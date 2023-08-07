package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Builder(toBuilder = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "perfume", indexes = @Index(name = "idx_pick_rate", columnList = "pick, rate"))
public class Perfume {

    @Id
    @Column(name = "perfumeId")
    private int perfumeId;

    @Column(name = "name")
    private String name;

    @Column(name = "nameOrg")
    private String nameOrg;

    @ManyToOne
    @JoinColumn(name = "brandId", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Brand brand;

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

    @Column(name = "pick")
    private int pick;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfumeId")
    private List<Accord> accord;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfumeId")
    private List<NoteList> note;
}
