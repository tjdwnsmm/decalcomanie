package com.eightlow.decalcomanie.sns.mapper;

import com.eightlow.decalcomanie.sns.dto.CommentDto;
import com.eightlow.decalcomanie.sns.dto.request.CommentRequest;
import com.eightlow.decalcomanie.sns.dto.request.CreateCommentRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentDtoMapper {
    CommentDto fromCommentRequest(CommentRequest commentRequest);
}
