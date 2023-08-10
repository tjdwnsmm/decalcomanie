import styled from 'styled-components';
import { EachFeedInfo } from '../../types/FeedInfoType';
import PerfumeInfoBox from '../Perfume/PerfumeInfoBox';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';
import { useEffect, useState } from 'react';
import axios from '../../api/apiController';
import getLoggedInUserNickname from '../../api/loggedInUserNickname';

interface FeedComponentProps {
  feed: EachFeedInfo;
  handleDetail: (articleId: number) => void;
  handleFollow: (userId: string, follow: boolean) => void;
}

/**
@summary
FeedBox : 피드 전체페이지에서의 하나의 피드 구분
PerfumeInfoBox : 향수 정보 임베디드
ContentBox : 피드 게시물 내용
InfoBox : 피드 나머지 부분 내용
  - ProfileBox : 닉네임과 프로필 이미지
  - IconBox : 좋아요 아이콘, 좋아요 수, 스크랩 버튼
*/

const FeedPage = ({ feed, handleDetail, handleFollow }: FeedComponentProps) => {
  const [picked, setPicked] = useState(feed.hearted);
  const [count, setCount] = useState(feed.articleDtos.heart);
  const [followed, setFollowed] = useState(feed.followed);

  useEffect(() => {
    setPicked(feed.articleDtos.picked);
    setCount(feed.articleDtos.heart);
    setFollowed(feed.followed);
  }, [feed, count]);

  const handleFollowClick = (userId: string) => {
    axios.post('/user/follow', { to: userId }).then((res) => {
      console.log(res.data);
      handleFollow(feed.userInfoDto.user.userId, !followed);
      setFollowed(!followed);
    });
  };

  const removeHtmlTags = (inputString: string) => {
    return inputString.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <>
      <FeedBox>
        <div onClick={() => handleDetail(feed.articleDtos.articleId)}>
          <PerfumeInfoBox feed={feed.perfumeDtos} />
          <ContentBox>
            {removeHtmlTags(
              feed.articleDtos.content.length > 100
                ? feed.articleDtos.content.slice(0, 100) + '...'
                : feed.articleDtos.content,
            )}
          </ContentBox>
        </div>
        <InfoBox>
          <ProfileBox>
            <img
              src={
                feed.userInfoDto.user.picture
                  ? feed.userInfoDto.user.picture
                  : 'assets/avatar/peeps-avatar-alpha-1.png'
              }
            />
            {feed.userInfoDto.user.nickname}
            <Follow
              onClick={() => {
                handleFollowClick(feed.userInfoDto.user.userId);
              }}
            >
              {feed.userInfoDto.user.nickname !== getLoggedInUserNickname() ? (
                followed ? (
                  <div className="following">팔로잉</div>
                ) : (
                  '팔로우'
                )
              ) : (
                <></>
              )}
            </Follow>
          </ProfileBox>
          <IconBox>
            <LikeBtn
              picked={feed.hearted}
              count={count}
              likeUrl="/sns/like"
              dislikeUrl="/sns/dislike"
              articleId={feed.articleDtos.articleId}
            />
            <ScrapBtn
              isScrap={feed.bookmarked}
              articleId={feed.articleDtos.articleId}
            />
          </IconBox>
        </InfoBox>
      </FeedBox>
    </>
  );
};

export default FeedPage;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 500;

  img {
    margin-top: -5px;
    width: 30px;
    border-radius: 50%;
}
  }
`;
const IconBox = styled.div`
  display: flex;
  gap: 10px;
`;

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  border-bottom: 1px solid var(--gray-color);
`;

const ContentBox = styled.div`
  display: flex;
  font-size: 13.5px;
  font-weight: 400;
  line-height: 18px;
  margin: 15px 10px;
`;

const Follow = styled.div`
  margin-left: 10px;
  color: var(--primary-color);

  .following {
    color: var(--dark-gray-color);
  }
`;
