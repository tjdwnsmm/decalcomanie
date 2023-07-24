import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Bar } from '../../assets/img/bar.svg';

interface TextProp {
  size?: string;
  fontweight?: string;
  color?: string;
}

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
  box-shadow: 5px 5px 5px var(--gray-color);
`;

const CountBox = styled.div`
`;

export default function ProfileStats() {
  return (
    <StatsDiv>
      <StatsBox>
        <CountBox>
            <BoxText size='14pt' color='var(--primary-color)' fontweight='700'>123</BoxText>
            <BoxText size='10pt'>Following</BoxText>
        </CountBox>
        <Bar />
        <CountBox>
            <BoxText size='14pt' color='var(--primary-color)' fontweight='700'>123</BoxText>
            <BoxText size='10pt'>Post</BoxText>
        </CountBox>
        <Bar />
        <CountBox>
            <BoxText size='14pt' color='var(--primary-color)' fontweight='700'>123</BoxText>
            <BoxText size='10pt'>Followers</BoxText>
        </CountBox>
      </StatsBox>
    </StatsDiv>
  );
}
