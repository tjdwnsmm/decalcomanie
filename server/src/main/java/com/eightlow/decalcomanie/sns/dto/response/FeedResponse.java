package com.eightlow.decalcomanie.sns.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import lombok.*;

@Getter
@ToString
public class FeedResponse extends LikeAndBookmarkResponse {
    private UserInfoDto userInfoDto;
    private boolean isFollowed;
    private boolean isFollowingButtonActivate;
    private boolean isLastPage;
    private ArticleDto articleDtos;
    private PerfumeDto perfumeDtos;


    public FeedResponse(UserInfoDto userInfoDto, boolean isFollowed, boolean isFollowingButtonActivate,
                        ArticleDto article, PerfumeDto perfumeDto, boolean isHearted, boolean isBookmarked, boolean isLastPage) {
        super(isHearted, isBookmarked);
        this.userInfoDto = userInfoDto;
        this.isFollowed = isFollowed;
        this.isFollowingButtonActivate = isFollowingButtonActivate;
        this.isLastPage = isLastPage;
        this.articleDtos = article;
        this.perfumeDtos = perfumeDto;
    }
}
