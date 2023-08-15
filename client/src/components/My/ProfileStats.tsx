import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as Bar } from '../../assets/img/bar.svg';

interface TextProp {
  size?: string;
  fontWeight?: string;
  color?: string;
}

interface StatProp {
  postCount: number;
  followingCount: number;
  followerCount: number;
}

const formatNumber = (number: number): string => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
};

export default function ProfileStats({ postCount, followerCount, followingCount }: StatProp) {
  const navigate = useNavigate();

  const handleClick = (initialActiveTab: 'follower' | 'following') => {
    navigate(`/follow-list?initialActiveTab=${initialActiveTab}`);
  };

  return (
    <StatsDiv>
      <StatsBox>
        <CountBox onClick={() => handleClick('follower')}>
          <BoxText size="13pt" color="var(--primary-color)" fontWeight="700">
            {formatNumber(followerCount)}
          </BoxText>
          <BoxText size="9.5pt">Follower</BoxText>
        </CountBox>
        <Bar />
        <div>
          <BoxText size="13pt" color="var(--primary-color)" fontWeight="700">
            {formatNumber(postCount)}
          </BoxText>
          <BoxText size="9.5pt">Post</BoxText>
        </div>
        <Bar />
        <CountBox onClick={() => handleClick('following')}>
          <BoxText size="13pt" color="var(--primary-color)" fontWeight="700">
            {formatNumber(followingCount)}
          </BoxText>
          <BoxText size="9.5pt">Following</BoxText>
        </CountBox>
      </StatsBox>
    </StatsDiv>
  );
}

const BoxText = styled.div<TextProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

const StatsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 330px;
  height: 70px;
  border-radius: 20px;
  background-color: var(--white-color);
`;

const CountBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;