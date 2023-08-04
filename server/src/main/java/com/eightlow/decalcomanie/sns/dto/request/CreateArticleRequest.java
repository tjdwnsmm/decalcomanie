package com.eightlow.decalcomanie.sns.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateArticleRequest {
    private int articleId;
    private String userId;
    private String content;
    private List<Integer> perfumeId;
    private List<Integer> rate;
//    private int heart;
//    private int comment;
}
