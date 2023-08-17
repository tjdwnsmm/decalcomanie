package com.eightlow.decalcomanie.sns.entity.pk;

import lombok.Data;

import java.io.Serializable;

@Data
public class GradePk implements Serializable {
    private String userId;
    private int perfumeId;
}
