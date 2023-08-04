package com.eightlow.decalcomanie.sns.dto.request;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    private int commentId;
    private int articleId;
    private String userId;
    private String content;
}
