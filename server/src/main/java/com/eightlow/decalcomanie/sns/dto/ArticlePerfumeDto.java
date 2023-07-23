package com.eightlow.decalcomanie.sns.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class ArticlePerfumeDto{
    private int articleId;
    private int perfumeId;
}
