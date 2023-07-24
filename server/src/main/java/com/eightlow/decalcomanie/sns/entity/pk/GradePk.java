package com.eightlow.decalcomanie.sns.entity.pk;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class GradePk implements Serializable {
    private UUID userId;
    private int perfumeId;
}
