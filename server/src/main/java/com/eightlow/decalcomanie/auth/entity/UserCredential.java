package com.eightlow.decalcomanie.auth.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "usercredential")
public class UserCredential {
    @Id
    @Column(name="userId")
    private String userId;

    @Column(name="email")
    private String email;

    @Column(name="refreshToken")
    private String refreshToken;
}
