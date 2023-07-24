package com.eightlow.decalcomanie.sns.dto;

import com.eightlow.decalcomanie.common.dto.BaseDto;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ArticleDto extends BaseDto {
    private int articleId;
    private String userId;
    private String content;
    private int heart;
    private int comment;

}
