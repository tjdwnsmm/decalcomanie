import React, { useState } from 'react';
import styled from 'styled-components';

// styled-components의 PolymorphicComponentProps 타입을 사용하여 props의 타입을 미리 지정
interface TabProps {
  active: boolean;
  onClick?: () => void;
}

// FollowTab으로부터 넘어온 props에 대한 type 설정
interface FollowTabProps {
  setNowActive: (tab: 'followers' | 'following') => void;
  followersCount: number;
  followingCount: number;
}

const TabContainer = styled.div`
  display: flex;
  height: 40px;
  line-height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
`;

const Tab = styled.div<TabProps>`
  text-align: center;
  padding: 0px 5px;
  cursor: pointer;
  color: ${(props) => (
    props.active ? 'var(--primary-color)' : 'var(--gray-color)')};
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    color: var(--primary-color);
  }
`;

const FollowTab = ({ setNowActive, followersCount, followingCount }: FollowTabProps) => {
  // 초기값 임시 데이터 사용
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
    'following',
  );

  // 탭을 클릭시
  const handleTabClick = (tab: 'followers' | 'following') => {
    setActiveTab(tab);
    setNowActive(tab);
  };

  return (
    <TabContainer>
      <Tab
        active={activeTab === 'followers'}
        onClick={() => handleTabClick('followers')}
      >
        팔로워 {followersCount}
      </Tab>
      <Tab
        active={activeTab === 'following'}
        onClick={() => handleTabClick('following')}
      >
        팔로잉 {followingCount}
      </Tab>
    </TabContainer>
  );
};

export default FollowTab;
