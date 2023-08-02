import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { commentDto, commmentUsers } from '../../types/PostInfoType';
import { PostModalBtn } from '../Button/PostModalBtn';

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
  // 요청보낸 사람이 댓글 작성자일 때만 수정/삭제 나오도록
  // 임시로 설정
  // const CurrentUser = '복이';
  // const isWriter = comment.writer === CurrentUser ? true : false;

  const [elapsedTime, setElapsedTime] = useState(
    getElapsedTime(comment.createdAt),
  );

  // 페이지가 처음 로드될 때 작성 시간과 현재 시간의 차이를 업데이트
  useEffect(() => {
    setElapsedTime(getElapsedTime(comment.createdAt));
  }, [comment.createdAt]);

  // 새로고침할 때 작성 시간과 현재 시간의 차이를 업데이트
  const handlePageRefresh = () => {
    setElapsedTime(getElapsedTime(comment.createdAt));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handlePageRefresh);

    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, [comment.createdAt]);

  return (
    <CommentBoxContainer>
      <ProfileImage src={commentUser.user.picture} alt="프로필" />
      <CommentContent>
        <InfoBox>
          <UserNickname>{commentUser.user.nickname}</UserNickname>
          <CreatedAt>{getTimeString(elapsedTime, comment.createdAt)}</CreatedAt>
        </InfoBox>
        <Content>{comment.content}</Content>
      </CommentContent>
      {/* {isWriter && <PostModalBtn />} */}
    </CommentBoxContainer>
  );
};

export default CommentBox;
