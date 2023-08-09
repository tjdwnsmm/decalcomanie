package com.eightlow.decalcomanie.user.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPerfumeDto {
    private String userId;

    private int perfumeId;
}

