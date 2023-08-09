package com.eightlow.decalcomanie.user.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPerfumeId implements Serializable {
    private String user;

    private int perfume;
}
