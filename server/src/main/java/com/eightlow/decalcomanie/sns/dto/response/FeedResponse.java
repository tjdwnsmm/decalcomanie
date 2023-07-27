package com.eightlow.decalcomanie.sns.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeedResponse {
    private UserInfoDto userInfoDto;
    private ArticleDto articleDtos;
    private PerfumeDto perfumeDtos;

}
