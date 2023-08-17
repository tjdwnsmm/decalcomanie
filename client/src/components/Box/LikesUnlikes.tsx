import React from 'react';
import { styled } from 'styled-components';
import { ScentDto } from '../../types/PerfumeInfoType';

interface Props {
  likes: ScentDto[];
  unlikes: ScentDto[];
}

export default function LikesUnlikes({ likes, unlikes }: Props) {
  return (
    <>
      <BoxDiv>
        {/* 좋아하는 향료 3개 이름 출력 */}
        {likes.map((like, index) => (
          <LikeBox key={index}>{like.name}</LikeBox>
        ))}
      </BoxDiv>
      <BoxDiv>
        {/* 싫어하는 향료 3개 이름 출력 */}
        {unlikes.map((unlike, index) => (
          <UnlikeBox key={index}>{unlike.name}</UnlikeBox>
        ))}
      </BoxDiv>
    </>
  );
}

const BoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px 10px;
  margin-top: 10px;
`;

const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: var(--white-color);
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  word-break: keep-all;
`;

const UnlikeBox = styled(LikeBox)`
  background-color: var(--gray-color);
`;
