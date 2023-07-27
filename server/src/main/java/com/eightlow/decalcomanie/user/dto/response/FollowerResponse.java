package com.eightlow.decalcomanie.user.dto.response;

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

    private List<String> favorite;

    private String picture;

    private boolean isFollowing;
}
