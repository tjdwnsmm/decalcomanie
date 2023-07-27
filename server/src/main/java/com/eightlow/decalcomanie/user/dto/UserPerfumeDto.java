package com.eightlow.decalcomanie.user.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPerfumeDto implements Serializable {
    private String userId;

    private int perfumeId;
}
