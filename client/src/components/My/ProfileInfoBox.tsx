import styled from 'styled-components';
import { PerfumeInfo } from '../../types/FeedInfoType';

/**
 * @param {PerfumeInfo} PerfumeInfo
 * @summary
 *  ImgBox : 향수 이미지
 */

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
  box-shadow: 5px 5px 5px var(--gray-color);
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
