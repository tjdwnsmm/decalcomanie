package com.eightlow.decalcomanie.user.dto.response;

import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import lombok.*;

import java.util.List;

@Getter
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowerResponse {
    private String userId;

    private String nickname;

    private List<ScentDto> favorite;
    private List<ScentDto> hates;

    private String picture;

    private boolean isFollowing;
}
