import React, { useState, useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { commentDto, commmentUsers } from '../../types/PostInfoType';
import CommentModalBtn from '../Button/CommentModalBtn';
import axios from '../../api/apiController';

interface CommentBoxProps {
  comment: commentDto;
  commentUser: commmentUsers;
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
  margin-bottom: 6px;
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
  line-height: 17px;
`;

const StyledTextarea = styled.textarea<{ isEditing: boolean }>`
  display: ${({ isEditing }) => (isEditing ? 'block' : 'none')};
  width: 65%;
  height: 16px;
  border: 1px solid var(--gray-color);
  outline-color: var(--gray-color);
  background-color: var(--background-color);
  resize: none;
  padding: 8px 10px;
  border-radius: 5px;
  margin-top: 5px;
`;

const ModiBtn = styled.button<{ isEditable: boolean }>`
  height: 32px;
  border: none;
  background-color: var(--background-color);
  font-size: 16px;
  color: ${({ isEditable }) =>
    isEditable ? 'var(--primary-color)' : 'var(--gray-color)'};
  cursor: ${({ isEditable }) => (isEditable ? 'pointer' : '')};
`;

const getElapsedTime = (createdAt: string): number => {
  const createdAtDate = new Date(createdAt);
  const currentTime = new Date();
  // console.log('작성시간', createdAtDate);
  // console.log(currentTime);
  const diff = currentTime.getTime() - createdAtDate.getTime(); // 단위: (ms)
  const elapsedTime = Math.floor(diff / 1000 / 60);
  return elapsedTime;
};

const getTimeString = (elapsedTime: number, createdAt: string): string => {
  if (elapsedTime < 1) {
    return '방금 전';
  } else if (elapsedTime < 60) {
    return `${elapsedTime}분 전`;
  } else if (elapsedTime < 1440) {
    return `${Math.floor(elapsedTime / 60)}시간 전`;
  } else if (elapsedTime < 10080) {
    return `${Math.floor(elapsedTime / 1440)}일 전`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(createdAt).toLocaleDateString('ko-KR', options);
  }
};

const CommentBox = ({ comment, commentUser }: CommentBoxProps) => {
  const [elapsedTime, setElapsedTime] = useState(
    getElapsedTime(comment.createdAt),
  );
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditable, setIsEditable] = useState(false);

  // 댓글 작성 시간 관련
  useEffect(() => {
    setElapsedTime(getElapsedTime(comment.createdAt));
  }, [comment.createdAt]);

  const handlePageRefresh = () => {
    setElapsedTime(getElapsedTime(comment.createdAt));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handlePageRefresh);

    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, [comment.createdAt]);

  // 댓글 수정사항 관련
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditedContent(newValue);
    setIsEditable(newValue.trim() !== comment.content && newValue.length > 0);
  };

  const handleEditClick = async () => {
    if (editedContent.trim().length > 0) {
      try {
        const response = await axios.put('/sns/comment/update', {
          articleId: comment.articleId,
          commentId: comment.commentId,
          content: editedContent,
        });
        console.log('댓글이 수정되었습니다:', response.data);
        setEditedContent('');
        setEditing(false);
        window.location.reload();
      } catch (error) {
        console.error('댓글 수정 중 오류:', error);
      }
    }
  };

  const handleCancleClick = () => {
    setEditedContent(comment.content);
    setEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && isEditable) {
      event.preventDefault();
      handleEditClick();
    }
  };

  return (
    <CommentBoxContainer>
      <ProfileImage
        src={
          commentUser.user.picture
            ? commentUser.user.picture
            : '/assets/avatar/peeps-avatar-alpha-9.png'
        }
      />
      <CommentContent>
        <InfoBox>
          <UserNickname>{commentUser.user.nickname}</UserNickname>
          <CreatedAt>{getTimeString(elapsedTime, comment.createdAt)}</CreatedAt>
        </InfoBox>
        {!isEditing && <Content>{comment.content}</Content>}
        {isEditing && (
          <InfoBox>
            <StyledTextarea
              isEditing={isEditing}
              value={editedContent}
              onChange={handleContentChange}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyPress(e)}
            />
            <ModiBtn isEditable={isEditable} onClick={handleEditClick}>
              수정
            </ModiBtn>
            <ModiBtn
              isEditable={false}
              onClick={handleCancleClick}
              style={{ cursor: 'pointer' }}
            >
              취소
            </ModiBtn>
          </InfoBox>
        )}
      </CommentContent>
      {commentUser.me && !isEditing && (
        <CommentModalBtn
          comment={comment}
          isEditing={isEditing}
          setEditing={setEditing}
        />
      )}
    </CommentBoxContainer>
  );
};

export default CommentBox;
