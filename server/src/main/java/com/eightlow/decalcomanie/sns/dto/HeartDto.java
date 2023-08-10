package com.eightlow.decalcomanie.sns.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HeartDto {
    private int articleId;
    private String userId;
}
