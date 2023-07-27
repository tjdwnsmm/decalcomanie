package com.eightlow.decalcomanie.user.entity;

import com.eightlow.decalcomanie.perfume.dto.request.PerfumePickRequest;
import com.eightlow.decalcomanie.user.dto.FollowDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@Getter
@IdClass(FollowDto.class)
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Follow {
    @Id
    @Column(name="following")
    private String following;

    @Id
    @Column(name="followed")
    private String followed;
}
