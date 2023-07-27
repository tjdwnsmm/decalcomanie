import styled from 'styled-components';
import {
  EachFeedInfo,
  ArticleDetail,
  FeedDetail,
} from '../../types/FeedInfoType';
import PerfumeInfoBox from '../Perfume/PerfumeInfoBox';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';

interface FeedComponentProps {
  feed: EachFeedInfo;
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

const FeedPage = ({ feed }: FeedComponentProps) => (
  <>
    <FeedBox>
      <PerfumeInfoBox feed={feed.perfumeDtos} />
      <ContentBox>{feed.articleDtos.content}</ContentBox>
      <InfoBox>
        <ProfileBox>
          <img src={'src/assets/img/profile-user.png'} />
          {feed.articleDtos.userId}
        </ProfileBox>
        <IconBox>
          <LikeBtn count={feed.articleDtos.heart} />
          <ScrapBtn />
        </IconBox>
      </InfoBox>
    </FeedBox>
  </>
);

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
