import styled from 'styled-components';
import { FeedProps } from '../../types/FeedInfoType';
import ProfileInfoBox from './ProfileInfoBox';

interface FeedComponentProps {
  feed: FeedProps;
}

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ProfileTabs = ({ feed }: FeedComponentProps) => (
  <>
    <FeedBox>
      <ProfileInfoBox img={feed.perfumeInfo.img} />
    </FeedBox>
  </>
);

export default ProfileTabs;
