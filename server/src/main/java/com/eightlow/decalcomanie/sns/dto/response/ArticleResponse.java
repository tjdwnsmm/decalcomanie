package com.eightlow.decalcomanie.sns.dto.response;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;
import lombok.*;

import java.util.List;

@Getter
@ToString
public class ArticleResponse extends LikeAndBookmarkResponse{
    private ArticleDto articleDto;
    List<CommentDto> comments;
    private List<Integer> perfumeIdList;
    private List<GradeDto> gradeDto;

    public ArticleResponse(ArticleDto articleDto, List<CommentDto> comments, List<Integer> perfumeIdList, List<GradeDto> rates, boolean isHearted, boolean isBookmarked) {
        super(isHearted, isBookmarked);
        this.articleDto = articleDto;
        this.comments = comments;
        this.perfumeIdList = perfumeIdList;
        this.gradeDto = rates;
    }
}
