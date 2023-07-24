package com.eightlow.decalcomanie.sns.entity.pk;

import lombok.*;

import java.io.Serializable;

@Data
public class CommentPk implements Serializable {
    private int commentId;
    private int articleId;
}
