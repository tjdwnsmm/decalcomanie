package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment toEntity(CommentDto commentDTO);

    public default Comment toEntityWithoutId(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setArticleId(commentDto.getArticleId());
        comment.setUserId(commentDto.getUserId());
        comment.setContent(commentDto.getContent());
        // 기타 필드 설정...
        // commentId 필드는 빼기 위해 생략하거나 null로 설정합니다.

        return comment;
    }
    List<CommentDto> toDTO(List<Comment> comments);
}
