package com.eightlow.decalcomanie.user.entity;

import com.eightlow.decalcomanie.perfume.dto.request.PerfumePickRequest;
import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@IdClass(UserPerfumeDto.class)
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userperfume")
public class UserPerfume {
    @Id
    @Column(name="userId")
    private String userId;

    @Id
    @Column(name="perfumeId")
    private int perfumeId;
}
