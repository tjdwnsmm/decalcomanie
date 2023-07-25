import styled from 'styled-components';
import { FeedProps } from '../../types/FeedInfoType';
import ProfileInfoBox from './ProfileInfoBox';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';

interface FeedComponentProps {
  feed: FeedProps;
}

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
`;

/**
@summary
FeedBox : 피드 전체페이지에서의 하나의 피드 구분
PerfumeInfoBox : 향수 정보 임베디드
ContentBox : 피드 게시물 내용
InfoBox : 피드 나머지 부분 내용
  - ProfileBox : 닉네임과 프로필 이미지
  - IconBox : 좋아요 아이콘, 좋아요 수, 스크랩 버튼
*/

const ProfileTabs = ({ feed }: FeedComponentProps) => (
  <>
    <FeedBox>
      <ProfileInfoBox img={feed.perfumeInfo.img} />
    </FeedBox>
  </>
);

export default ProfileTabs;
