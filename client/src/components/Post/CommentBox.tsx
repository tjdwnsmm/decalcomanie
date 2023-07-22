import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../types/PostInfoTypes';
import { PostModalBtn } from '../Button/PostModalBtn';

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
  flex: 1;
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

const CommentBox = ({ comment }: CommentBoxProps) => {
  // 요청보낸 사람이 댓글 작성자일 때만 수정/삭제 나오도록
  // 임시로 설정
  const CurrentUser = '복이'
  const isWriter = comment.writer === CurrentUser ? true : false;
  
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
      {isWriter && <PostModalBtn/>}
    </CommentBoxContainer>
  );
};

export default CommentBox;
