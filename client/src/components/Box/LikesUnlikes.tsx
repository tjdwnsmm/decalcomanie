import React from 'react';
import { styled } from 'styled-components';

const BoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px 10px;
  margin-bottom: 10px;
`;

const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 25px;
  border-radius: 4px;
  background-color: var(--primary-color);
  box-shadow: 5px 5px 5px var(--gray-color);
  color: var(--white-color);
  font-size: 14px;
  font-weight: bold;
`;

const UnlikeBox = styled(LikeBox)`
  background-color: var(--gray-color);
`;

export default function LikesUnlikes() {
  return (
    <p>
      <BoxDiv>
        <LikeBox>우디</LikeBox>
        <LikeBox>플로럴</LikeBox>
        <LikeBox>시트러스</LikeBox>
      </BoxDiv>
      <BoxDiv>
        <UnlikeBox>머스크</UnlikeBox>
        <UnlikeBox>코코넛</UnlikeBox>
        <UnlikeBox>스파이시</UnlikeBox>
      </BoxDiv>
    </p>
  );
}
