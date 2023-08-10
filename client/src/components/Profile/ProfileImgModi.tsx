import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';

interface ProfileProps {
  handleImg: (key: string) => void;
  closeModal: () => void;
}

const ProfileImgModi = ({ closeModal, handleImg }: ProfileProps) => {
  const imageCount = 9; // 이미지 개수
  const images = Array.from(
    { length: imageCount },
    (_, index) => `peeps-avatar-alpha-${index + 1}.png`,
  );

  const handleImageClick = (imgSrc: string) => {
    if (window.confirm('이 프로필로 변경하시겠습니까?')) {
      handleImg(imgSrc);
      closeModal();
    }
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseSvg onClick={closeModal} />
        <Info>원하는 프로필을 선택해주세요</Info>
        {/* profile list 보여주는 코드 */}
        <ImgList>
          {images.map((imageName, index) => (
            <ProfileEach
              key={index}
              onClick={() => {
                handleImageClick(`assets/avatar/${imageName}`);
              }}
            >
              <ProfileImage src={`assets/avatar/${imageName}`} />
            </ProfileEach>
          ))}
        </ImgList>
      </ModalContent>
    </ModalBackground>
  );
};

export default ProfileImgModi;

const ImgList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Info = styled.div`
  text-align: center;
  font-weight: 700;
  margin: 15px auto;
`;

const ProfileEach = styled.div`
  width: calc(33.33% - 10px);
  margin: 5px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px 20px 40px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: height 0.3s; /* Add height transition */
`;
