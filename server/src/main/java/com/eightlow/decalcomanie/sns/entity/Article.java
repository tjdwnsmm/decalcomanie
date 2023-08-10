package com.eightlow.decalcomanie.sns.entity;

import com.eightlow.decalcomanie.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="article")
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

    @OneToMany(mappedBy = "article")
    private List<Comment> comments;

    @OneToMany(mappedBy = "article")
    private List<ArticlePerfume> articlePerfume;

    @OneToMany(mappedBy = "article")
    private List<Heart> heartUsers;
}
