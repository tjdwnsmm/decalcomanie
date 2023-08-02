package com.eightlow.decalcomanie.sns.dto.response;

import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import lombok.*;

import java.util.List;

@Getter
@ToString
public class ArticleResponse extends LikeAndBookmarkResponse{
    private ArticleDto articleDto;
    private UserInfoDto userInfoDto;
    private boolean isFollowed;
    private List<CommentDto> comments;
    private List<UserInfoDto> commmentUsers;
    private List<PerfumeDto> perfumeInfos;
    private List<GradeDto> gradeDto;

    public ArticleResponse(ArticleDto articleDto, UserInfoDto userInfo, boolean isFollowed, List<CommentDto> comments, List<UserInfoDto> commentUsers, List<PerfumeDto> perfumes, List<GradeDto> rates, boolean isHearted, boolean isBookmarked) {
        super(isHearted, isBookmarked);
        this.articleDto = articleDto;
        this.userInfoDto = userInfo;
        this.isFollowed = isFollowed;
        this.comments = comments;
        this.commmentUsers = commentUsers;
        this.perfumeInfos = perfumes;
        this.gradeDto = rates;
    }
}
