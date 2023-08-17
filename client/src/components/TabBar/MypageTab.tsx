import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ColoredBookmark } from '../../assets/icon/colored-bookmark.svg';
import { ReactComponent as ColoredFeed } from '../../assets/icon/colored-feed.svg';
import { ReactComponent as ColoredLike } from '../../assets/icon/colored-like.svg';
import { ReactComponent as UncoloredBookmark } from '../../assets/icon/uncolored-bookmark.svg';
import { ReactComponent as UncoloredFeed } from '../../assets/icon/uncolored-feed.svg';
import { ReactComponent as UncoloredLike } from '../../assets/icon/uncolored-like.svg';

interface TabProps {
  active?: boolean;
  onClick?: () => void;
}

interface FeedTabProps {
  setNowActive: (keyword: string) => void;
}

export const MyPageTab = ({ setNowActive }: FeedTabProps) => {
  const [activeTab, setActiveTab] = useState('post');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setNowActive(tab);
  };

  return (
    <TabContainer>
      <Tab active={activeTab === 'post'} onClick={() => handleTabClick('post')}>
        {activeTab === 'post' ? <ColoredFeed /> : <UncoloredFeed />}
      </Tab>
      <Tab
        active={activeTab === 'bookmark'}
        onClick={() => handleTabClick('bookmark')}
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
