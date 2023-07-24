package com.eightlow.decalcomanie.sns.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class CreateArticleRequest {
    private int articleId;
    private UUID userId;
    private String content;
    private List<Integer> perfumeId;
    private List<Integer> rate;
//    private int heart;
//    private int comment;
}
