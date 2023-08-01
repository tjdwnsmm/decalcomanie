package com.eightlow.decalcomanie.user.dto.response;

import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import lombok.*;

import java.util.List;

@Getter
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowingResponse {
    private String userId;

    private String nickname;

    private List<ScentDto> favorite;

    private String picture;
}
