package com.eightlow.decalcomanie.sns.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import lombok.*;

import java.util.List;

@Getter
@ToString
public class FeedResponse extends LikeAndBookmarkResponse {
    private UserInfoDto userInfoDto;
    private boolean isFollowed;
    private ArticleDto articleDtos;
    private PerfumeDto perfumeDtos;


    public FeedResponse(UserInfoDto userInfoDto, boolean isFollowed, ArticleDto article, PerfumeDto perfumeDto, boolean isHearted, boolean isBookmarked) {
        super(isHearted, isBookmarked);
        this.userInfoDto = userInfoDto;
        this.isFollowed = isFollowed;
        this.articleDtos = article;
        this.perfumeDtos = perfumeDto;
    }
}
