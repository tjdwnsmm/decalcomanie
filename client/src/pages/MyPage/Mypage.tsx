import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Main } from '../../style';
import { FeedTab } from '../../components/TabBar/FeedTab';
import ProfileImage from '../../components/My/ProfileImage';
import OptionMenu from '../../components/My/OptionMenu';
import LikesUnlikes from '../../components/Box/LikesUnlikes';
import ProfileStats from '../../components/My/ProfileStats';
import ProfileTabs from '../../components/My/ProfileTabs';

//API 호출 전 임시데이터
const feeds: FeedProps[] = [
  {
    perfumeInfo: {
      name: '탐다오',
      brand: '딥디크',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 ...',
  },
  {
    perfumeInfo: {
      name: '미르토 디 파나레아',
      brand: '아쿠아 디 파르마',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 ...',
  },
  {
    perfumeInfo: {
      name: '집시 워터',
      brand: '바이레도',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 ...',
  },
];
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
  const [nowActive, setNowActive] = useState('following');
  return (
    <Main>
      <OptionMenu />
      <ProfileImage />
      <MypageText size="18px" fontweight="bold" textalign="center">
        닉네임은여덟글자
      </MypageText>
      <LikesUnlikes />
      <ProfileStats />
      <FeedTab setNowActive={setNowActive} />
      {feeds.map((feed, idx) => (
        <ProfileTabs key={idx} feed={feed} />
      ))}
    </Main>
  );
}
