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
    private List<CommentDto> comments;
    private List<UserInfoDto> commmentUsers;
    private List<PerfumeDto> perfumeInfos;
    private List<GradeDto> gradeDto;

    public ArticleResponse(ArticleDto articleDto, UserInfoDto userInfoDto,
                           List<CommentDto> comments, List<UserInfoDto> commmentUsers, List<PerfumeDto> perfumeInfos,
                           List<GradeDto> gradeDto, boolean isHearted, boolean isBookmarked) {
        super(isHearted, isBookmarked);
        this.articleDto = articleDto;
        this.userInfoDto = userInfoDto;
        this.comments = comments;
        this.commmentUsers = commmentUsers;
        this.perfumeInfos = perfumeInfos;
        this.gradeDto = gradeDto;
    }
}
