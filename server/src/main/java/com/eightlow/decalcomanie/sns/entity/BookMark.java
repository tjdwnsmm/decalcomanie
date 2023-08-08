package com.eightlow.decalcomanie.sns.entity;

import com.eightlow.decalcomanie.sns.entity.pk.BookMarkPk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(BookMarkPk.class)
@Table(name="bookmark", indexes = {
        @Index(name = "idx_articleId", columnList = "articleId"),
        @Index(name = "idx_userId", columnList = "userId"),
})
public class BookMark {

    @Id
    @Column(name = "articleId")
    private int articleId;

    @Id
    @Column(name = "userId")
    private String userId;
}
