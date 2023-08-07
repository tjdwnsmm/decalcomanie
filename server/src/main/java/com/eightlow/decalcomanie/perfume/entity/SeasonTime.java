package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder(toBuilder = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seasontime")
public class SeasonTime {
    @Id
    private int seasonTimeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfumeId", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Perfume perfume;

    private String occasion;

    private float weight;
}
