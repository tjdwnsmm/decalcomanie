import React, { useState } from 'react';
import { Main } from '../../style';
import FollowTab from '../../components/TabBar/FollowTab';
import FollowBox from '../../components/Follow/FollowBox';
import { FollowInfo } from '../../types/ProfileInfoType';

// 임시 데이터
const follwers: FollowInfo[] = [
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '코코',
    favScent: ['우디', '플로럴', '시트러스'],
    // 내가(=페이지 요청자) 팔로우 하고 있는지
    isFollow: true,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '루루',
    favScent: ['프루티', '플로럴', '오션'],
    isFollow: true,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '캔디',
    favScent: ['그린', '오리엔탈', '스파이시'],
    isFollow: false,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '꾹이',
    favScent: ['우디', '플로럴', '시트러스'],
    isFollow: true,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '초코',
    favScent: ['프루티', '플로럴', '오션'],
    isFollow: false,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '꼬미',
    favScent: ['그린', '오리엔탈', '스파이시'],
    isFollow: true,
  },
];

const following: FollowInfo[] = [
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '코코',
    favScent: ['우디', '플로럴', '시트러스'],
    isFollow: true,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '루루',
    favScent: ['프루티', '플로럴', '오션'],
    isFollow: true,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '꾹이',
    favScent: ['우디', '플로럴', '시트러스'],
    isFollow: true,
  },
  {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '꼬미',
    favScent: ['그린', '오리엔탈', '스파이시'],
    isFollow: true,
  },
];

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
      {activeTab === 'followers' && <FollowBox followList={follwers} />}
      {activeTab === 'following' && <FollowBox followList={following} />}
    </Main>
  );
};

export default FollowList;
