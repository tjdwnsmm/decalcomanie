package com.eightlow.decalcomanie.sns.entity;

import com.eightlow.decalcomanie.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Article extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int articleId;

    @Column(unique = true, nullable = false)
    private String userId;

    private String content;

    @ColumnDefault("0")
    private int heart;

    @ColumnDefault("0")
    private int comment;
}
