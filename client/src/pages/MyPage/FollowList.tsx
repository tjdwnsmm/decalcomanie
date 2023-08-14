import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import { Main, MarginFrame } from '../../style';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';
import FollowTab from '../../components/TabBar/FollowTab';
import FollowBox from '../../components/Follow/FollowBox';
import { FollowInfo } from '../../types/ProfileInfoType';
import { user } from '../../types/PostInfoType';

const Button = styled.button`
  background: none;
  border: none;
  margin: 24px 18px 0px;
  cursor: pointer;
`;

const NoFollow = styled.div`
  width: 84%;
  padding: 5% 8%;
  text-align: center;
  font-size: 18px;
  font-weight: 500;

  .goFollow {
    font-size: 16px;
    border: none;
    background-color: var(--background-color);
    cursor: pointer;
  }
`;

const FollowList = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'follower' | 'following'>('follower');
  const [follower, setFollower] = useState<FollowInfo[]>([]);
  const [following, setFollowing] = useState<FollowInfo[]>([]);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [targetUser, setTargetUser] = useState<user>();
  const location = useLocation();

  const handleLeftArrowClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    // API 호출
    const fetchFollowData = async () => {
      try {
        // 팔로워 목록 조회
        const followerResponse = await axios.get(`/user/follower/${id}`);
        setFollower(followerResponse.data.data);
        console.log('팔로워', followerResponse.data);
        // 팔로잉 목록 조회
        const followingResponse = await axios.get(`/user/following/${id}`);
        setFollowing(followingResponse.data.data);
        console.log('팔로잉', followingResponse.data);

        // 팔로워 수, 팔로잉 수, 유저 정보 설정
        setFollowerCount(followerResponse.data.data.length);
        setFollowingCount(followingResponse.data.data.length);
        setTargetUser(followerResponse.data.targetUser.user);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchFollowData();
  }, [id]);

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
      {targetUser?.nickname}
      <FollowTab
        setNowActive={setActiveTab}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      {activeTab === 'follower' && ((followerCount > 0) ? (
        <FollowBox followList={follower} />
      ) : (
        <NoFollow>
          {targetUser?.nickname}님을 팔로워하는 사람이 없어요.
          <MarginFrame margin='10px 0px'>
            {/* 마이페이지 api 완성 후 navigate 수정 필요 */}
            <button className='goFollow' onClick={() => navigate('/mypage')}>팔로우하러 가기</button>
          </MarginFrame>
        </NoFollow>
      ))}
      {activeTab === 'following' && ((followingCount > 0) ? (
        <FollowBox followList={following} />
      ) : (
        <NoFollow>{targetUser?.nickname}님이 팔로잉하는 사람이 없어요.</NoFollow>
      ))}
    </Main>
  );
};

export default FollowList;
