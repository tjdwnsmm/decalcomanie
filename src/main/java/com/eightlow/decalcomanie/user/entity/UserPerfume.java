package com.eightlow.decalcomanie.user.entity;

import com.eightlow.decalcomanie.perfume.dto.request.PerfumePickRequest;
import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(UserPerfumeDto.class)
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserPerfume {
    @Id
    @Column(name="userId")
    private String userId;

    @Id
    @Column(name="perfumeId")
    private int perfumeId;
}
