package com.eightlow.decalcomanie.sns.entity.pk;

import lombok.Data;

import java.io.Serializable;

@Data
public class HeartPk implements Serializable {
    private int articleId;
    private String userId;
}
