import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import { Main } from '../../style';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';
import FollowTab from '../../components/TabBar/FollowTab';
import FollowBox from '../../components/Follow/FollowBox';
import { FollowInfo } from '../../types/ProfileInfoType';

const Button = styled.button`
  background: none;
  border: none;
  margin: 24px 18px 0px;
  cursor: pointer;
`;

const FollowList = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id === 'my-follow' ? '' : `/${id}`;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'follower' | 'following'>('follower');
  const [follower, setFollower] = useState<FollowInfo[]>([]);
  const [following, setFollowing] = useState<FollowInfo[]>([]);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const location = useLocation();

  const handleLeftArrowClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    // API 호출
    const fetchFollowData = async () => {
      try {
        // 팔로워 목록 조회
        const followerResponse = await axios.get(`/user/follower${userId}`);
        setFollower(followerResponse.data);

        // 팔로잉 목록 조회
        const followingResponse = await axios.get(`/user/following${userId}`);
        setFollowing(followingResponse.data);

        // 팔로워 수, 팔로잉 수 조회
        setFollowerCount(followerResponse.data.length);
        setFollowingCount(followingResponse.data.length);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchFollowData();
  }, [userId]);

  useEffect(() => {
    // URL에서 초기 activeTab 값 가져오기
    const params = new URLSearchParams(location.search);
    const initialActiveTabFromURL = params.get('initialActiveTab');

    // 기본값이 follower이므로 following이라는 값이 들어올 때만 ActiveTab 세팅
    if (initialActiveTabFromURL === 'following') {
      setActiveTab(initialActiveTabFromURL);
    }
  }, [location]);

  return (
    <Main>
      <Button onClick={handleLeftArrowClick}>
        <LeftArrow />
      </Button>
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
