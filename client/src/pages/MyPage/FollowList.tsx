import React, { useState, useEffect } from 'react';
import axios from '../../api/apiController';
import { Main } from '../../style';
import FollowTab from '../../components/TabBar/FollowTab';
import FollowBox from '../../components/Follow/FollowBox';
import { FollowInfo } from '../../types/ProfileInfoType';

// 임시 데이터
// const follower: FollowInfo[] = [
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '코코',
//     favScent: ['우디', '플로럴', '시트러스'],
//     // 내가(=페이지 요청자) 팔로우 하고 있는지
//     isFollow: true,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '루루',
//     favScent: ['프루티', '플로럴', '오션'],
//     isFollow: true,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '캔디',
//     favScent: ['그린', '오리엔탈', '스파이시'],
//     isFollow: false,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '꾹이',
//     favScent: ['우디', '플로럴', '시트러스'],
//     isFollow: true,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '초코',
//     favScent: ['프루티', '플로럴', '오션'],
//     isFollow: false,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '꼬미',
//     favScent: ['그린', '오리엔탈', '스파이시'],
//     isFollow: true,
//   },
// ];

// const following: FollowInfo[] = [
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '코코',
//     favScent: ['우디', '플로럴', '시트러스'],
//     isFollow: true,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '루루',
//     favScent: ['프루티', '플로럴', '오션'],
//     isFollow: true,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '꾹이',
//     favScent: ['우디', '플로럴', '시트러스'],
//     isFollow: true,
//   },
//   {
//     profileImg: 'src/assets/img/profile-user.png',
//     writer: '꼬미',
//     favScent: ['그린', '오리엔탈', '스파이시'],
//     isFollow: true,
//   },
// ];

const FollowList = () => {
  const [activeTab, setActiveTab] = useState<'follower' | 'following'>('following');
  const [follower, setFollower] = useState<FollowInfo[]>([]);
  const [following, setFollowing] = useState<FollowInfo[]>([]);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
    
  useEffect(() => {
    // API 호출
    const fetchFollowData = async () => {
      try {
        // 팔로워 목록 조회
        const followerResponse = await axios.get('/user/follower/{userId}'); // userId를 적절한 값으로 바꾸세요.
        setFollower(followerResponse.data);

        // 팔로잉 목록 조회
        const followingResponse = await axios.get('/user/following/{userId}'); // userId를 적절한 값으로 바꾸세요.
        setFollowing(followingResponse.data);

        // 팔로워 수, 팔로잉 수 조회
        setFollowerCount(followerResponse.data.length);
        setFollowingCount(followingResponse.data.length);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchFollowData();
  }, []);

  return (
    <Main>
      <FollowTab
        setNowActive={setActiveTab}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      {activeTab === 'follower' && <FollowBox followList={follower} />}
      {activeTab === 'following' && <FollowBox followList={following} />}
    </Main>
  );
};

export default FollowList;
