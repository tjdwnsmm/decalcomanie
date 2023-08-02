import styled from 'styled-components';
import {
  EachFeedInfo,
  ArticleDetail,
  FeedDetail,
} from '../../types/FeedInfoType';
import PerfumeInfoBox from '../Perfume/PerfumeInfoBox';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';
import { USERID } from '../../api/apiController';
import { useEffect, useState } from 'react';
import { FollowBtn } from '../Button/FollowBtn';

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
  useEffect(() => {
    setPicked(feed.articleDtos.picked);
    setCount(feed.articleDtos.heart);
  }, [feed, count]);

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
            <Follow>팔로우</Follow>
          </ProfileBox>
          <IconBox>
            <LikeBtn
              picked={feed.hearted}
              count={count}
              likeUrl="/sns/like"
              dislikeUrl="/sns/dislike"
              articleId={feed.articleDtos.articleId}
              userId={USERID}
            />
            <ScrapBtn
              isScrap={feed.bookmarked}
              articleId={feed.articleDtos.articleId}
              userId={USERID}
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
  gap: 3px;
  font-size: 12px;
  font-weight: 600;
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
  font-size: 12px;
  font-weight: 300;
  line-height: 18px;
  margin: 10px;
`;

const Follow = styled.div`
  margin-left: 10px;
  color: var(--primary-color);
`;
