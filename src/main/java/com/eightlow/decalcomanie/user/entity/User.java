package com.eightlow.decalcomanie.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name="userId")
    private String userId;

    @Column(name="accessToken")
    private String accessToken;

    @Column(name="nickname")
    private String nickname;

    @Column(name="deletedAt")
    private LocalDateTime deletedAt;

    @Column(name="age")
    private int age;

    @Column(name="gender")
    private int gender;

    @Column(name="refreshToken")
    private String refreshToken;

    @Column(name="picture")
    private String picture;
}
