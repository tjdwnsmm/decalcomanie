package com.eightlow.decalcomanie.sns.entity.pk;

import lombok.Data;

import java.io.Serializable;

@Data
public class BookMarkPk implements Serializable {
    private int article;
    private String user;
}
