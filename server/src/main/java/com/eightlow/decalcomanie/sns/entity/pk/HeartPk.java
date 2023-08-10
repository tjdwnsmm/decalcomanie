package com.eightlow.decalcomanie.sns.entity.pk;

import com.eightlow.decalcomanie.sns.entity.Article;
import com.eightlow.decalcomanie.user.entity.User;
import lombok.Data;

import java.io.Serializable;

@Data
public class HeartPk implements Serializable {
    private int article;
    private String user;
}
