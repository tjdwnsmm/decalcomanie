package com.eightlow.decalcomanie.user.dto;

import com.eightlow.decalcomanie.perfume.entity.Perfume;
import lombok.*;

import java.io.Serializable;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPerfumeDto implements Serializable {
    private String user;

    private int perfume;
}

