import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Main, MarginFrame } from '../../style';
import { MyPageTab } from '../../components/TabBar/MypageTab';
import ProfileImage from '../../components/My/ProfileImage';
import OptionMenu from '../../components/My/OptionMenu';
import LikesUnlikes from '../../components/Box/LikesUnlikes';
import ProfileStats from '../../components/My/ProfileStats';
import ProfileTabs from '../../components/My/ProfileTabs';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { ScentDto } from '../../types/PerfumeInfoType';
import { EachFeedInfo } from '../../types/FeedInfoType';

interface TextProp {
  size?: string;
  fontWeight?: string;
  color?: string;
  textalign?: string;
}

interface Feed {
  id: string;
  picture: string;
  perfumeId: number;
}

export default function Mypage() {
  const [nowActive, setNowActive] = useState<string>('post');
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchFeedsForTab = (tab: string) => {
    setLoading(true);
    // 북마크
    if (tab === 'bookmark') {
      axios
        .post('/user/bookmark', { dataSize: 20, lastArticleId: null })
        .then((res) => {
          if (res.data === '') {
            setFeeds([]);
          } else {
            const myBookmarks = res.data.map((bookmarkData: EachFeedInfo) => ({
              id: bookmarkData.articleDtos.articleId,
              picture: bookmarkData.perfumeDtos
                ? bookmarkData.perfumeDtos.picture
                : '../../../public/assets/img/perfume-drawer.svg',
            }));
            setFeeds(myBookmarks);
            setLoading(false);
          }
        });

      // 내가 쓴 글
    } else if (tab === 'post') {
      axios
        .post('/sns/user', { dataSize: 20, lastArticleId: null })
        .then((res) => {
          if (res.data === '') {
            setFeeds([]);
          } else {
            const myPosts = res.data.map((postData: EachFeedInfo) => ({
              id: postData.articleDtos.articleId,
              picture: postData.perfumeDtos
                ? postData.perfumeDtos.picture
                : '../../../public/assets/img/perfume-drawer.svg',
            }));
            setPostCount(myPosts.length);
            setFeeds(myPosts);
            setLoading(false);
          }
        });

      // 내가 찜한 향수
    } else if (tab === 'like') {
      axios.get('/perfume/picked').then((res) => {
        //console.log('res :', res);
        if (res.data === '') {
          setFeeds([]);
        } else {
          setFeeds(res.data);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    fetchFeedsForTab(nowActive);
  }, [nowActive]);

  const handleTabClick = (tab: string) => {
    setNowActive(tab);
    fetchFeedsForTab(tab);
  };

  const [favorites, setFavorites] = useState<ScentDto[]>([]);
  const [hates, setHates] = useState<ScentDto[]>([]);

  const [postCount, setPostCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const [userImage, setUserImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');

  const [dataLoaded, setDataLoaded] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    // 데이터 로드 함수 정의
    const loadData = async () => {
      try {
        // 프로필 이미지, 선호/비선호 향료 관련
        const infoRes = await axios.get('/user/info');
        setUserImage(infoRes.data.user.picture);
        setFavorites(infoRes.data.favorities);
        setHates(infoRes.data.hates);
        setUserId(infoRes.data.user.userId);
      } catch (error) {
        console.error('Error loading data:', error);
      }
      try {
        // Follower 수
        const followerRes = await axios.get('/user/follower');
        setFollowerCount(followerRes.data.length);
      } catch (error) {
        console.error('Error loading data:', error);
      }
      try {
        // Following 수
        const followingRes = await axios.get('/user/following');
        setFollowingCount(followingRes.data.length);

        // 모든 데이터 로딩 완료
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    // 데이터 로드 실행
    loadData();
  }, []);

  return (
    <Main>
      <MarginFrame margin="10px 0">
        <OptionMenu />
        <ProfileImage userImage={userImage} likes={favorites} />
        <MypageText size="18px" fontWeight="bold" textalign="center">
          {localStorage.getItem('nickname')}
        </MypageText>
        <LikesUnlikes likes={favorites} unlikes={hates} />
        <ProfileStats
          postCount={postCount}
          followerCount={followerCount}
          followingCount={followingCount}
          userId={userId}
        />
        <MyPageTab setNowActive={handleTabClick} />
        <MypageContainer>
          {feeds.length === 0 ? (
            <Nothing>아직 데이터가 없습니다 😥</Nothing>
          ) : (
            <>
              <Column>
                {feeds.map((feed, index) => (
                  <ProfileTabs
                    onClick={() => {
                      if (feed.perfumeId) {
                        navigation(`/perfume-detail/${feed.perfumeId}`);
                      } else {
                        navigation(`/post-detail/${feed.id}`);
                      }
                    }}
                    key={index}
                    id={feed.id}
                    picture={feed.picture}
                    perfumeId={feed.perfumeId}
                  />
                ))}
              </Column>
            </>
          )}
        </MypageContainer>
        <MarginFrame margin="80px"></MarginFrame>
      </MarginFrame>
      <BottomNav />
    </Main>
  );
}

const MypageText = styled.div<TextProp>`
  font-size: ${(props) => props.size || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${(props) => props.color || 'inherit'};
  text-align: ${(props) => props.textalign || 'left'};
`;

const MypageContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px 5px;

  div {
    width: 150px;
  }
`;

const Nothing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin-top: 15px;
`;
