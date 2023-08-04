package com.eightlow.decalcomanie.sns.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="articleperfume")
public class ArticlePerfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int articlePerfumeId;

    private int articleId;

    private int perfumeId;
}
