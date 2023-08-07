package com.eightlow.decalcomanie.perfume.entity;

import com.eightlow.decalcomanie.perfume.dto.PerfumePickId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@IdClass(PerfumePickId.class)
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "perfumepick")
public class PerfumePick {
    @Id
    private String userId;

    @Id
    @ManyToOne
    @JoinColumn(name = "perfumeId", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Perfume perfume;
}
