import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { CenterFrame, Main, MarginFrame } from '../../style';
import ProfileImage from '../../components/My/ProfileImage';
import ProfileStats from '../../components/My/ProfileStats';
import LikesUnlikes from '../../components/Box/LikesUnlikes';
import ProfileTabs from '../../components/My/ProfileTabs';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { ScentDto } from '../../types/PerfumeInfoType';
import { EachFeedInfo } from '../../types/FeedInfoType';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';
import FollowBtn from '../../components/Button/FollowBtn';
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

export function OtherProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [feeds, setFeeds] = useState<Feed[] | null>([]);
  const [isLoading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<ScentDto[]>([]);
  const [hates, setHates] = useState<ScentDto[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [isFollow, setFollow] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string>('');
  const [nickname, setUserNickname] = useState<string>('');
  const navigation = useNavigate();

  useEffect(() => {
    axios.get(`/user/profile/${id}`).then((res) => {
      const userData = res.data;
      //console.log(userData);
      setFollowerCount(userData.follower);
      setFollowingCount(userData.following);
      setFavorites(userData.userInfo.favorities);
      setHates(userData.userInfo.hates);
      setUserImage(userData.userInfo.user.picture);
      // setUserId(userData.userInfo.user.userId);
      setUserNickname(userData.userInfo.user.nickname);
      setFollow(userData.userInfo.following);
      setIsMe(userData.userInfo.me);
    });

    axios
      .post('/sns/user', { dataSize: 100, lastArticleId: null, userId: id })
      .then((res) => {
        //console.log(res.data);
        setPostCount(res.data.length);
        const otherFeed = res.data.map((feedData: EachFeedInfo) => ({
          id: feedData.articleDtos.articleId,
          picture: feedData.perfumeDtos
            ? feedData.perfumeDtos.picture
            : '/assets/img/drawer-float.png',
        }));
        setFeeds(otherFeed);
        setLoading(false);
      });
  }, []);

  const handleLeftArrowClick = () => {
    // 뒤로가기
    navigation(-1);
  };

  const handleFollow = () => {
    isFollow
      ? setFollowerCount(followerCount - 1)
      : setFollowerCount(followerCount + 1);
  };

  if (isMe) {
    navigation('/mypage');
  }
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
          {nickname}
        </MypageText>
        {favorites.length === 0 && hates.length === 0 ? (
          <Text>사용자가 선호/비선호향을 등록하지 않았습니다</Text>
        ) : (
          <LikesUnlikes likes={favorites} unlikes={hates} />
        )}
        <MarginFrame margin="10px 0 -10px ">
          <CenterFrame>
            <FollowBox onClick={handleFollow}>
              <FollowBtn isFollow={isFollow} to={id ? id : ''} />
            </FollowBox>
          </CenterFrame>
        </MarginFrame>

        <ProfileStats
          postCount={postCount}
          followerCount={followerCount}
          followingCount={followingCount}
          userId={id ? id : ''}
        />
        <MypageContainer>
          {feeds ? (
            feeds.map((feed, index) => (
              <ProfileTabs
                onClick={() => {
                  if (feed.perfumeId) {
                    navigation(`/perfume/detail/${feed.perfumeId}`);
                  } else {
                    navigation(`/post-detail/${feed.id}`);
                  }
                }}
                key={index}
                id={feed.id}
                picture={feed.picture}
                perfumeId={feed.perfumeId}
              />
            ))
          ) : (
            <>
              <MarginFrame margin="100px auto">
                <CenterFrame className="errorTitle">
                  작성된 글이 없습니다 😥
                </CenterFrame>
              </MarginFrame>
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
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 10px;

  .errorTitle {
    font-weight: 700;
  }
`;

const FollowBox = styled.div``;
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
const Text = styled.div`
  margin-top: 5px;
  text-align: center;
  font-size: 12px;
  color: var(--gray-color);
`;
