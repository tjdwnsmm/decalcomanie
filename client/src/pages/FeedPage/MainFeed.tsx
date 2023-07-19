import React from 'react';
import { useState } from 'react';
import { FeedTab } from '../../components/TabBar/FeedTab';
import FeedPage from '../../components/Feed/FeedPage';
import { FeedProps } from '../../types/FeedInfoType';
import { Main } from '../../style';
import FloatingWriteBtn from '../../components/Button/FloatingWriteBtn';

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

export const MainFeed = () => {
  //default 탭 : following
  const [nowActive, setNowActive] = useState('following');

  //현재 탭을 설정하는 setNowActive 를 props 로 넘겨서 탭 변경에 따라 페이지 내용이 변경되도록 구현
  return (
    <Main>
      <FeedTab setNowActive={setNowActive} />
      {feeds.map((feed, idx) => (
        <FeedPage key={idx} feed={feed} />
      ))}
      <FloatingWriteBtn />
    </Main>
  );
};
