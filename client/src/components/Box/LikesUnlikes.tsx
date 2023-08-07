import { Favorite } from '@mui/icons-material';
import React from 'react';
import { styled } from 'styled-components';

interface Res {
  res: {
    favorite: string[];
    hate: string[];
  };
}

const testRes: Res = {
  res: {
    favorite: ['우디', '플로럴', '시트러스'],
    hate: ['머스크', '코코넛', '스파이시'],
  },
};

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
  width: 60px;
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

export default function LikesUnlikes() {
  return (
    <>
      <BoxDiv>
        <LikeBox>{testRes.res.favorite[0]}</LikeBox>
        <LikeBox>{testRes.res.favorite[1]}</LikeBox>
        <LikeBox>{testRes.res.favorite[2]}</LikeBox>
      </BoxDiv>
      <BoxDiv>
        <UnlikeBox>{testRes.res.favorite[0]}</UnlikeBox>
        <UnlikeBox>{testRes.res.favorite[1]}</UnlikeBox>
        <UnlikeBox>{testRes.res.favorite[2]}</UnlikeBox>
      </BoxDiv>
    </>
  );
}
