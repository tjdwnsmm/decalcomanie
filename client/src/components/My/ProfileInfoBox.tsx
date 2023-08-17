import styled from 'styled-components';

interface ImgBoxProps {
  picture: string;
}

const ProfileInfoBox = ({ picture }: ImgBoxProps) => (
  <>
    <ImgBox>
      <PerfumeImg src={picture} />
    </ImgBox>
  </>
);

export default ProfileInfoBox;

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

const PerfumeImg = styled.img`
  width: 100px;
  height: 100px;
`;
