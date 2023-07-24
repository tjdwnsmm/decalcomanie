package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.request.CommentRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-24T14:43:43+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class CommentDtoMapperImpl implements CommentDtoMapper {

    @Override
    public CommentDto fromCommentRequest(CommentRequest commentRequest) {
        if ( commentRequest == null ) {
            return null;
        }

        CommentDto.CommentDtoBuilder<?, ?> commentDto = CommentDto.builder();

        commentDto.commentId( commentRequest.getCommentId() );
        commentDto.articleId( commentRequest.getArticleId() );
        commentDto.userId( commentRequest.getUserId() );
        commentDto.content( commentRequest.getContent() );

        return commentDto.build();
    }
}
