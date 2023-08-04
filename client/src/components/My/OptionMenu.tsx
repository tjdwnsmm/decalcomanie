import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as MoreVert } from '../../assets/icon/more-vert.svg';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';
import { useNavigate } from 'react-router-dom';

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  height: 50px;
`;

const Button = styled.button`
  background: none;
  border: none;
  margin: 8px;
  cursor: pointer;
`;

const OptionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: var(--gray-color);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: start;
  /* background-color: rgba(0, 0, 0, 0.4); */
  z-index: 1;
`;
const ModalContent = styled.div<{ top: number; left: number }>`
  position: fixed;
  top: ${(props) => props.top + 15}px;
  background-color: white;
  padding: 10px;
  margin-right: 15px;
  border-radius: 8px;
`;

export default function OptionMenu() {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
    setModalOpen(!isModalOpen);
  };

  const handleLeftArrowClick = () => {
    // 뒤로가기
    navigate(-1);
  };

  // 회원정보 수정 페이지로 이동
  const handleEditClick = () => {
    // 회원정보 수정 url
    navigate('/profile-update');
  };

  // 로그아웃 하시겠습니까? 모달 창 띄우기
  const handleLogoutClick = () => {
    // 로그아웃 API
  };

  // 바깥 영역을 클릭 시 모달이 닫힘
  const handleModalContainerClick = () => {
    setModalOpen(false);
  };

  return (
    <TopDiv>
      <Button onClick={handleLeftArrowClick}>
        <LeftArrow />
      </Button>
      <Button onClick={handleModalToggle}>
        <MoreVert />
      </Button>
      {isModalOpen && (
        <ModalContainer onClick={handleModalContainerClick}>
          <ModalContent top={modalPosition.y} left={modalPosition.x}>
            <OptionButton onClick={handleEditClick}>회원정보 수정</OptionButton>
            <OptionButton onClick={handleLogoutClick}>로그아웃</OptionButton>
          </ModalContent>
        </ModalContainer>
      )}
    </TopDiv>
  );
}
