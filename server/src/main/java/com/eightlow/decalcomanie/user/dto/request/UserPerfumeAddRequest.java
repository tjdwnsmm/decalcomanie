package com.eightlow.decalcomanie.user.dto.request;

import lombok.*;

@Getter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPerfumeAddRequest {
    private String userId;

    private int perfumeId;
}
