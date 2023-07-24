package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.request.CreateCommentRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-24T09:13:14+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class CommentDtoMapperImpl implements CommentDtoMapper {

    @Override
    public CommentDto fromCreateArticleRequest(CreateCommentRequest createCommentRequest) {
        if ( createCommentRequest == null ) {
            return null;
        }

        CommentDto.CommentDtoBuilder<?, ?> commentDto = CommentDto.builder();

        commentDto.commentId( createCommentRequest.getCommentId() );
        commentDto.articleId( createCommentRequest.getArticleId() );
        commentDto.userId( createCommentRequest.getUserId() );
        commentDto.content( createCommentRequest.getContent() );

        return commentDto.build();
    }
}
