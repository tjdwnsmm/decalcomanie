import styled from 'styled-components';
import { EachFeedInfo } from '../../types/FeedInfoType';
import ProfileInfoBox from './ProfileInfoBox';

interface FeedComponentProps {
  feed: string;
}

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ProfileTabs = ({ feed }: FeedComponentProps) => (
  <>
    <FeedBox>
      <ProfileInfoBox picture={feed} />
    </FeedBox>
  </>
);

export default ProfileTabs;
