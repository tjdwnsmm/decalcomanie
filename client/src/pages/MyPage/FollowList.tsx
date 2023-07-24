import React, { useState, useEffect } from 'react';
import { Main } from '../../style';
import FollowTab from '../../components/TabBar/FollowTab';

const FollowersComponent = () => {
  // 팔로워 목록을 렌더링하는 컴포넌트 구현
  return <div>팔로워 목록</div>;
};

const FollowingComponent = () => {
  // 팔로잉 목록을 렌더링하는 컴포넌트 구현
  return <div>팔로잉 목록</div>;
};

const FollowList = () => {
  // useEffect(() => {
  //   // 비동기 로직을 구현
  //   // 초기 활성화되는 탭이 무엇인지: 팔로워 눌러서 들어왔는지/ 팔로잉 눌러서 들어왔는지
  //   // 팔로워, 팔로잉 수 가져오기
  //   };
  // };

  // 임시 데이터 사용
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
    'following',
  );
  const followersCount = 338;
  const followingCount = 298;

  return (
    <Main>
      <FollowTab
        setNowActive={setActiveTab}
        followersCount={followersCount}
        followingCount={followingCount}
      />
      {activeTab === 'followers' && <FollowersComponent />}
      {activeTab === 'following' && <FollowingComponent />}
    </Main>
  );
};

export default FollowList;
