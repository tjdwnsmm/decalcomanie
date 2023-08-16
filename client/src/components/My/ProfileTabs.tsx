import styled from 'styled-components';
import ProfileInfoBox from './ProfileInfoBox';

interface FeedComponentProps {
  id: string;
  picture: string;
  perfumeId: number;
  onClick: () => void;
}

const ProfileTabs = ({ id, picture, perfumeId, onClick }: FeedComponentProps) => (
  <>
    <FeedBox onClick={onClick}>
      <ProfileInfoBox picture={picture} />
    </FeedBox>
  </>
);

export default ProfileTabs;

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
