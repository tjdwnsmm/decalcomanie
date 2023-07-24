package com.eightlow.decalcomanie.sns.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticlePerfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int articlePerfumeId;

    private int articleId;

    private int perfumeId;
}
