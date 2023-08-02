package com.eightlow.decalcomanie.sns.entity;

import com.eightlow.decalcomanie.common.entity.BaseEntity;
import com.eightlow.decalcomanie.sns.entity.pk.CommentPk;
import lombok.*;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;

import javax.persistence.*;

@Entity
@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@IdClass(CommentPk.class)
public class Comment extends BaseEntity {
    @Id
    private int commentId;

    @Id
    private int articleId;

    private String userId;
    private String content;
}
