import React from 'react';
import { styled } from 'styled-components';
import { Main } from '../../style';
import { FeedTab } from '../../components/TabBar/FeedTab';
import ProfileImage from '../../components/My/ProfileImage';
import OptionMenu from '../../components/My/OptionMenu';
import LikesUnlikes from '../../components/Box/LikesUnlikes';
import ProfileStats from '../../components/My/ProfileStats';

interface TextProp {
  size?: string;
  fontweight?: string;
  color?: string;
  textalign?: string;
}

const MypageText = styled.div<TextProp>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontweight};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textalign};
`;

export default function Mypage() {
  return (
    <Main>
      <OptionMenu />
      <ProfileImage />
      <MypageText size="18px" fontweight="bold" textalign="center">
        닉네임은여덟글자
      </MypageText>
      <LikesUnlikes />
      <ProfileStats />
    </Main>
  );
}
