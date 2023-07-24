import { styled } from 'styled-components';
import React from 'react';
import { Main } from '../../style';
import { FeedTab } from '../../components/TabBar/FeedTab';
import ProfileImage from '../../components/My/ProfileImage';
import OptionMenu from '../../components/My/OptionMenu';

const MypageText = styled.div`
    
`;

export default function Mypage() {
  return (
    <Main>
      <OptionMenu />
      <ProfileImage />
      <MypageText>닉네임</MypageText>
    </Main>
  );
}
