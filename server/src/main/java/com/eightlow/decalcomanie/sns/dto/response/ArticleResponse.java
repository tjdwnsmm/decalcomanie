package com.eightlow.decalcomanie.sns.dto.response;

import com.eightlow.decalcomanie.sns.dto.ArticleDto;
import com.eightlow.decalcomanie.sns.dto.ArticlePerfumeDto;
import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.GradeDto;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ArticleResponse {
    private ArticleDto articleDto;
    List<CommentDto> comments;
    private List<Integer> perfumeIdList;
    private List<GradeDto> gradeDto;
}
