import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  EachFeedInfo,
  ArticleDetail,
  FeedDetail,
} from '../../types/FeedInfoType';
import PerfumeInfoBox from '../Perfume/PerfumeInfoBox';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';
import axios from '../../api/apiController';
import getLoggedInUserNickname from '../../api/loggedInUserNickname';

interface FeedComponentProps {
  feed: EachFeedInfo;
  handleDetail: (articleId: number) => void;
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

const FeedPage = ({ feed, handleDetail }: FeedComponentProps) => {
  const [picked, setPicked] = useState(feed.hearted);
  const [count, setCount] = useState(feed.articleDtos.heart);
  const [followed, setFollowed] = useState(feed.followed);
  const myFeed = getLoggedInUserNickname() === feed.userInfoDto.user.nickname;

  useEffect(() => {
    setPicked(feed.articleDtos.picked);
    setCount(feed.articleDtos.heart);
  }, [feed, count]);

  const handleFollowClick = async () => {
    try {
      const requestData = { to: feed.articleDtos.userId };
      const response = await axios.post('/user/follow', requestData);
      console.log(response.data);
      setFollowed(!followed);
    } catch (error) {
      console.error('에러: ', error);
    }
  };

  return (
    <>
      <FeedBox>
        <div onClick={() => handleDetail(feed.articleDtos.articleId)}>
          <PerfumeInfoBox feed={feed.perfumeDtos} />
          <ContentBox>{feed.articleDtos.content}</ContentBox>
        </div>
        <InfoBox>
          <ProfileBox>
            <img src={'src/assets/img/profile-user.png'} />
            {feed.userInfoDto.user.nickname}
            {(!myFeed) && (
              <Follow followed={followed} onClick={handleFollowClick}>
                {followed ? '팔로잉' : '팔로우'}
              </Follow>
            )}
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
  font-size: 14px;
  font-weight: 500;
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
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  margin: 15px 10px;
`;

const Follow = styled.div<{ followed : boolean; }>`
  margin-left: 10px;
  color:  ${(props) => (props.followed ? 'var(--gray-color)' : 'var(--primary-color)')};
  cursor: pointer;
  `;
