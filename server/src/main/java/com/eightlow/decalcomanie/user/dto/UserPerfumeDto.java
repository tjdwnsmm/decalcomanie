package com.eightlow.decalcomanie.user.dto;

import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPerfumeDto {
    private String userId;

    private int perfumeId;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        UserPerfumeDto userPerfumeDto = (UserPerfumeDto) obj;
        return userId == userPerfumeDto.userId;
    }
}

