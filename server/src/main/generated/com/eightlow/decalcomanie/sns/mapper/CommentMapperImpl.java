package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.entity.Comment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-24T17:30:55+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment toEntity(CommentDto commentDTO) {
        if ( commentDTO == null ) {
            return null;
        }

        Comment.CommentBuilder<?, ?> comment = Comment.builder();

        comment.createdAt( commentDTO.getCreatedAt() );
        comment.updatedAt( commentDTO.getUpdatedAt() );
        comment.commentId( commentDTO.getCommentId() );
        comment.articleId( commentDTO.getArticleId() );
        comment.userId( commentDTO.getUserId() );
        comment.content( commentDTO.getContent() );

        return comment.build();
    }

    @Override
    public List<CommentDto> toDTO(List<Comment> comments) {
        if ( comments == null ) {
            return null;
        }

        List<CommentDto> list = new ArrayList<CommentDto>( comments.size() );
        for ( Comment comment : comments ) {
            list.add( commentToCommentDto( comment ) );
        }

        return list;
    }

    protected CommentDto commentToCommentDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentDto.CommentDtoBuilder<?, ?> commentDto = CommentDto.builder();

        commentDto.createdAt( comment.getCreatedAt() );
        commentDto.updatedAt( comment.getUpdatedAt() );
        commentDto.commentId( comment.getCommentId() );
        commentDto.articleId( comment.getArticleId() );
        commentDto.userId( comment.getUserId() );
        commentDto.content( comment.getContent() );

        return commentDto.build();
    }
}
