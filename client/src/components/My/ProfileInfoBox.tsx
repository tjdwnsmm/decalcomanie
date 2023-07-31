import styled from 'styled-components';
import { PerfumeInfo } from '../../types/FeedInfoType';

const ImgDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImgBox = styled.div`
  width: 165px;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--white-color);
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const ProfileInfoBox = ({ img }: PerfumeInfo) => (
  <>
    <ImgDiv>
      <ImgBox>
        <img src={img} />
      </ImgBox>
    </ImgDiv>
  </>
);

export default ProfileInfoBox;
