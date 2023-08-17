package com.eightlow.decalcomanie.user.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@RequiredArgsConstructor
public class FollowDto implements Serializable {
    private String following;

    private String followed;
}
