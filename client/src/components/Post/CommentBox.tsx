import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../types/PostInfoTypes';

interface CommentBoxProps {
  comment: Comment;
}

const CommentBoxContainer = styled.div`
  display: flex;
  align-items: start;
  padding: 5px 25px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 3px;
`;

const UserNickname = styled.div`
  color: var(--black-color);
  font-size: 13px;
  font-weight: 700;
`;

const CreatedAt = styled.div`
  color: var(--gray-color);
  font-size: 11px;
  font-weight: 400;
  margin-left: 10px;
`;

const Content = styled.div`
  color: var(--black-color);
  font-size: 13px;
  font-weight: 400;
  margin-top: 5px;
`;

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {
  return (
    <CommentBoxContainer>
      <ProfileImage src={comment.profileImg} alt="프로필" />
      <CommentContent>
        <InfoBox>
          <UserNickname>{comment.writer}</UserNickname>
          <CreatedAt>{comment.createdAt}</CreatedAt>
        </InfoBox>
        <Content>{comment.content}</Content>
      </CommentContent>
    </CommentBoxContainer>
  );
};

export default CommentBox;
