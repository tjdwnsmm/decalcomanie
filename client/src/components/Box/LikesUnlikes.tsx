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
        {likes.map((like) => (
          <LikeBox>{like.name}</LikeBox>
        ))}
      </BoxDiv>
      <BoxDiv>
        {/* 싫어하는 향료 3개 이름 출력 */}
        {unlikes.map((unlike) => (
          <UnlikeBox>{unlike.name}</UnlikeBox>
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
  width: 70px;
  height: 25px;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: var(--white-color);
  font-size: 14px;
  font-weight: bold;
`;

const UnlikeBox = styled(LikeBox)`
  background-color: var(--gray-color);
`;
