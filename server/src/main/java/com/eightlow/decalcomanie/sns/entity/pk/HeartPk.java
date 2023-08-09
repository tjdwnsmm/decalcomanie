package com.eightlow.decalcomanie.sns.entity.pk;

import com.eightlow.decalcomanie.sns.entity.Article;
import lombok.Data;

import java.io.Serializable;

@Data
public class HeartPk implements Serializable {
    private Article article;
    private String userId;
}
