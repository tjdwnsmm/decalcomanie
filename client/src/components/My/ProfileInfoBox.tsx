import styled from 'styled-components';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

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

interface ImgBoxProps {
  picture: string;
}

const ProfileInfoBox = ({ picture }: ImgBoxProps) => (
  <>
    <ImgDiv>
      <ImgBox>
        <img src={picture} />
      </ImgBox>
    </ImgDiv>
  </>
);

export default ProfileInfoBox;
