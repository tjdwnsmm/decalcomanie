package com.eightlow.decalcomanie.user.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@RequiredArgsConstructor
@Deprecated
public class UserPerfumeId implements Serializable {
    private String userId;

    private int perfumeId;
}
