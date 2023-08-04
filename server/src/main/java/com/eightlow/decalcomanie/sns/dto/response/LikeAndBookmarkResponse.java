package com.eightlow.decalcomanie.sns.dto.response;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LikeAndBookmarkResponse {
    boolean isHearted;
    boolean isBookmarked;
}
