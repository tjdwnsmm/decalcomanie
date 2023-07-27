import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ColoredBookmark } from '../../assets/icon/colored-bookmark.svg';
import { ReactComponent as ColoredFeed } from '../../assets/icon/colored-feed.svg';
import { ReactComponent as ColoredLike } from '../../assets/icon/colored-like.svg';
import { ReactComponent as UncoloredBookmark } from '../../assets/icon/uncolored-bookmark.svg';
import { ReactComponent as UncoloredFeed } from '../../assets/icon/uncolored-feed.svg';
import { ReactComponent as UncoloredLike } from '../../assets/icon/uncolored-like.svg';

// styled-components의 PolymorphicComponentProps 타입을 사용하여 props 의 타입을 미리 지정
interface TabProps {
  active?: boolean;
  onClick?: () => void;
}

// main-feed 로부터 넘어온 props 에 대한 type 설정
interface FeedTabProps {
  setNowActive: (keyword: string) => void;
}

export const MyPageTab = ({ setNowActive }: FeedTabProps) => {
  const [activeTab, setActiveTab] = useState('post');

  //탭을 클릭시
  const handleTabClick = (tab: string) => {
    setActiveTab(tab); //관련 css 수정
    setNowActive(tab); //페이지 업데이트
  };

  return (
    <TabContainer>
      <Tab active={activeTab === 'post'} onClick={() => handleTabClick('post')}>
        {activeTab === 'post' ? <ColoredFeed /> : <UncoloredFeed />}
      </Tab>
      <Tab
        active={activeTab === 'popularity'}
        onClick={() => handleTabClick('popularity')}
      >
        {activeTab === 'bookmark' ? <ColoredBookmark /> : <UncoloredBookmark />}
      </Tab>
      <Tab active={activeTab === 'like'} onClick={() => handleTabClick('like')}>
        {activeTab === 'like' ? <ColoredLike /> : <UncoloredLike />}
      </Tab>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--gray-color);
`;

const Tab = styled.div<TabProps>`
  width: 110px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.active ? 'var(--primary-color)' : 'black')};
  border-bottom: ${(props) =>
    props.active ? '2px solid var(--primary-color)' : 'none'};
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    color: var(--primary-color);
  }
`;
