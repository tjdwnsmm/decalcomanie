package com.eightlow.decalcomanie.sns.entity.pk;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;

@Data
public class GradePk implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userId;

    private int perfumeId;
}
