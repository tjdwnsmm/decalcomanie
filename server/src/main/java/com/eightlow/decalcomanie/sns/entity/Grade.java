package com.eightlow.decalcomanie.sns.entity;

import com.eightlow.decalcomanie.sns.entity.pk.GradePk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
//import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(GradePk.class)
@Table(name="grade")
public class Grade {
    @Id
    @Column(unique = true, nullable = false)
    private String userId;

    @Id
    private int perfumeId;

    private int rate;
}
