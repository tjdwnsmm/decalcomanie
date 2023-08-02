import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as Bar } from '../../assets/img/bar.svg';

interface TextProp {
  size?: string;
  fontweight?: string;
  color?: string;
}

interface StatProp {
  following: number;
  post: number;
  follower: number;
}

const data: StatProp = {
  following: 123123,
  post: 123123123,
  follower: 123123123123,
};

const BoxText = styled.div<TextProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontweight};
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

export default function ProfileStats() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/follow-list');
  };

  return (
    <StatsDiv>
      <StatsBox>
        <CountBox onClick={handleClick}>
          <BoxText size="13pt" color="var(--primary-color)" fontweight="700">
            {formatNumber(data.following)}
          </BoxText>
          <BoxText size="9.5pt">Following</BoxText>
        </CountBox>
        <Bar />
        <div>
          <BoxText size="13pt" color="var(--primary-color)" fontweight="700">
            {formatNumber(data.post)}
          </BoxText>
          <BoxText size="9.5pt">Post</BoxText>
        </div>
        <Bar />
        <CountBox onClick={handleClick}>
          <BoxText size="13pt" color="var(--primary-color)" fontweight="700">
            {formatNumber(data.follower)}
          </BoxText>
          <BoxText size="9.5pt">Followers</BoxText>
        </CountBox>
      </StatsBox>
    </StatsDiv>
  );
}
