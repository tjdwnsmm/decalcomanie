import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import { Main, MarginFrame } from '../../style';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';
import FollowTab from '../../components/TabBar/FollowTab';
import FollowBox from '../../components/Follow/FollowBox';
import { FollowInfo } from '../../types/ProfileInfoType';
import { userInfoDto } from '../../types/PostInfoType';
import { act } from 'react-dom/test-utils';

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--background-color);
`;                                                             

const InnerTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  left: 18px;
  cursor: pointer;
`;

const NoFollow = styled.div`
  width: 84%;
  padding: 8%;
  text-align: center;
  font-size: 18px;
  font-weight: 700;

  .goFollow {
    margin-top: 20px;
    font-size: 16px;
    border: none;
    background-color: var(--background-color);
    cursor: pointer;
    &:hover {
      color: var(--primary-color);
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
  const [targetUser, setTargetUser] = useState<userInfoDto>();
  const location = useLocation();

  const handleLeftArrowClick = () => {
    // api 연결 후 변경 필
    navigate('/mypage');
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

        setFollowerCount(followerResponse.data.data.length);
        setFollowingCount(followingResponse.data.data.length);
        setTargetUser(followerResponse.data.targetUser);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchFollowData();
  }, [id, activeTab]);

  useEffect(() => {
    // URL에서 초기 activeTab 값 가져오기
    const params = new URLSearchParams(location.search);
    const initialActiveTabFromURL = params.get('initialActiveTab');

    // 기본값이 follower이므로 following이라는 값이 들어올 때만 ActiveTab 세팅
    if (initialActiveTabFromURL === 'following') {
      setActiveTab(initialActiveTabFromURL);
    }
  }, [location]);
  
  useEffect(() => {
    setFollowingCount(following.length);
  }, [following]);

  return (
    <Main>
      <TopBar>
        <InnerTop>
          <div style={{ fontWeight: '600'}}>{targetUser?.user.nickname}</div>
          <Button onClick={handleLeftArrowClick}>
            <LeftArrow />
          </Button>
        </InnerTop>
        <FollowTab
          setNowActive={setActiveTab}
          followerCount={followerCount}
          followingCount={followingCount}
        />
      </TopBar>
      <MarginFrame margin='112px'/>
      {activeTab === 'follower' && ((followerCount > 0) ? (
        <FollowBox followList={follower} setFollowingList={setFollowing} isMe={targetUser?.me}/>
      ) : (
        <NoFollow>
          {targetUser?.user.nickname}님을 팔로우하는 사람이 없어요. 😥<br/>
          {/* 마이페이지 api 완성 후 navigate 수정 필요 */}
          {!targetUser?.me && (
            <button className='goFollow' onClick={() => navigate('/mypage')}>팔로우하러 가기</button>
          )}
        </NoFollow>
      ))}
      {activeTab === 'following' && ((followingCount > 0) ? (
        <FollowBox followList={following} setFollowingList={setFollowing} isMe={targetUser?.me}/>
      ) : (
        <NoFollow>
          {targetUser?.user.nickname}님이 팔로잉하는 사람이 없어요. 😥
        </NoFollow>
      ))}
    </Main>
  );
};

export default FollowList;
