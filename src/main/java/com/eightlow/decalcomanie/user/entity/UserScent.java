package com.eightlow.decalcomanie.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserScent {
    @Id
    @Column(name="userScentId")
    private int userScentId;

    @Column(name="userId")
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private Status status;

    @Column(name="scentId")
    private int scentId;
}

