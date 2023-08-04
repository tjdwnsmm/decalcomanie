package com.eightlow.decalcomanie.sns.entity;

import com.eightlow.decalcomanie.sns.entity.pk.BookMarkPk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(BookMarkPk.class)
@Table(name="bookmark")
public class BookMark {

    @Id
    private int articleId;

    @Id
    private String userId;
}
