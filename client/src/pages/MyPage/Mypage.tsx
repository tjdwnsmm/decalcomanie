import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Main } from '../../style';
import { FeedTab } from '../../components/TabBar/FeedTab';
import { FeedProps } from '../../types/FeedInfoType';
import ProfileImage from '../../components/My/ProfileImage';
import OptionMenu from '../../components/My/OptionMenu';
import LikesUnlikes from '../../components/Box/LikesUnlikes';
import ProfileStats from '../../components/My/ProfileStats';
import ProfileTabs from '../../components/My/ProfileTabs';

// 중복 데이터를 변수로 추출
const perfumeImages = [
  'src/assets/img/perfume1.png',
  'src/assets/img/perfume_aqua.png',
  'src/assets/img/perfume_doson.png',
  'src/assets/img/perfume_doson.png',
  'src/assets/img/perfume1.png',
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

// feeds 배열을 두 개의 열로 나누는 함수
const splitFeeds = (arr) => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

// 컨테이너 스타일 정의
const MypageContainer = styled.div`
  display: flex;
`;

// 열 스타일 정의
const Column = styled.div`
  flex: 1;
`;

export default function Mypage() {
  const [nowActive, setNowActive] = useState('following');
  const [firstColumnFeeds, secondColumnFeeds] = splitFeeds(perfumeImages);

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
      <MypageContainer>
        <Column>
          {firstColumnFeeds.map((img, idx) => (
            <ProfileTabs key={idx} feed={{ perfumeInfo: { img } }} />
          ))}
        </Column>
        <Column>
          {secondColumnFeeds.map((img, idx) => (
            <ProfileTabs key={idx} feed={{ perfumeInfo: { img } }} />
          ))}
        </Column>
      </MypageContainer>
    </Main>
  );
}
