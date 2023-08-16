import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Main, MarginFrame } from '../../style';
import { MyPageTab } from '../../components/TabBar/MypageTab';
import ProfileImage from '../../components/My/ProfileImage';
import LikesUnlikes from '../../components/Box/LikesUnlikes';
import ProfileStats from '../../components/My/ProfileStats';
import ProfileTabs from '../../components/My/ProfileTabs';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { ScentDto } from '../../types/PerfumeInfoType';
import { EachFeedInfo } from '../../types/FeedInfoType';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';
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

export default function OtherProfilePage() {
  const [nowActive, setNowActive] = useState<string>('post');
  const [feeds, setFeeds] = useState<Feed[] | null>([]);
  const [isLoading, setLoading] = useState(false);

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
    axios
      .post('/sns/user', { dataSize: 20, lastArticleId: null })
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

    // 데이터 로드 함수 정의
    const loadData = async () => {
      try {
        // 프로필 이미지, 선호/비선호 향료 관련
        const infoRes = await axios.get('/user/info');
        setUserImage(infoRes.data.user.picture);
        setFavorites(infoRes.data.favorities);
        setHates(infoRes.data.hates);
        setUserId(infoRes.data.user.userId);

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

  const handleLeftArrowClick = () => {
    // 뒤로가기
    navigation(-1);
  };

  return (
    <Main>
      <MarginFrame margin="10px 0">
        <TopDiv>
          <Button onClick={handleLeftArrowClick}>
            <LeftArrow />
          </Button>
        </TopDiv>
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
        <MypageContainer>
          {feeds?.map((firstColumnFeed, index) => (
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
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 10px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  height: 50px;
`;

const Button = styled.button`
  background: none;
  border: none;
  margin: 8px;
  cursor: pointer;
`;
