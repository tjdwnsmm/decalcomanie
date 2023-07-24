package com.eightlow.decalcomanie.sns.dto;


import com.eightlow.decalcomanie.common.dto.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@ToString
public class CommentDto extends BaseDto {
    private int commentId;
    private int articleId;
    private String userId;
    private String content;
}
