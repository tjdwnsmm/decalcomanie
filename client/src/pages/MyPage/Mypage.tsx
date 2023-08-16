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

// feeds 배열을 두 개의 열로 나누는 함수
const splitFeeds = (arr: Feed[]): [Feed[], Feed[]] => {
  const oddColumn: Feed[] = [];
  const evenColumn: Feed[] = [];

  if (arr) {
    arr.forEach((feed, idx) => {
      if (idx % 2 === 1) {
        evenColumn.push(feed);
      } else {
        oddColumn.push(feed);
      }
    });
  }

  return [oddColumn, evenColumn];
};

export default function Mypage() {
  const [nowActive, setNowActive] = useState<string>('post');
  const [feeds, setFeeds] = useState<Feed[] | null>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchFeedsForTab = (tab: string) => {
    setLoading(true);
    // 북마크
    if (tab === 'bookmark') {
      axios
        .post('/user/bookmark', { dataSize: 20, lastArticleId: null })
        .then((res) => {
          console.log(res.data);
          const myBookmarks = res.data.map((bookmarkData: EachFeedInfo) => ({
            id: bookmarkData.articleDtos.articleId,
            picture: bookmarkData.perfumeDtos
              ? bookmarkData.perfumeDtos.picture
              : '',
          }));
          setFeeds(myBookmarks);
          setLoading(false);
        });

      // 내가 쓴 글
    } else if (tab === 'post') {
      axios
        .post('/sns/user', { dataSize: 20, lastArticleId: null })
        .then((res) => {
          console.log(res.data);
          const myPosts = res.data.map((postData: EachFeedInfo) => ({
            id: postData.articleDtos.articleId,
            picture: postData.perfumeDtos ? postData.perfumeDtos.picture : '',
          }));
          setPostCount(myPosts.length);
          setFeeds(myPosts);
          setLoading(false);
        });

      // 내가 찜한 향수
    } else if (tab === 'like') {
      axios.get('/perfume/picked').then((res) => {
        setFeeds(res.data);
        setLoading(false);
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

  const [firstColumnFeeds, secondColumnFeeds] = splitFeeds(feeds || []);

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

        // Follower 수
        const followerRes = await axios.get('/user/follower');
        setFollowerCount(followerRes.data.length);

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
        />
        <MyPageTab setNowActive={handleTabClick} />
        <MypageContainer>
          <Column>
            {firstColumnFeeds.map((firstColumnFeed, index) => (
              <ProfileTabs
                onClick={() => {
                  if (firstColumnFeed.perfumeId) {
                    navigation(`/perfume/detail/${firstColumnFeed.perfumeId}`);
                  } else {
                    navigation(`/post-detail/${firstColumnFeed.id}`);
                  }
                }}
                key={index}
                id={firstColumnFeed.id}
                picture={firstColumnFeed.picture}
                perfumeId={firstColumnFeed.perfumeId}
              />
            ))}
          </Column>
          <Column>
            {secondColumnFeeds.map((secondColumnFeed, index) => (
              <ProfileTabs
                onClick={() => {
                  if (secondColumnFeed.perfumeId) {
                    navigation(`/perfume/detail/${secondColumnFeed.perfumeId}`);
                  } else {
                    navigation(`/post-detail/${secondColumnFeed.id}`);
                  }
                }}
                key={index}
                id={secondColumnFeed.id}
                picture={secondColumnFeed.picture}
                perfumeId={secondColumnFeed.perfumeId}
              />
            ))}
          </Column>
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
  padding: 10px 50px;
  justify-content: center;
`;

const Column = styled.div`
  flex: 1;
`;
