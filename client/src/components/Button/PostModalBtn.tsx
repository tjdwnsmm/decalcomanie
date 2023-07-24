import { styled } from 'styled-components';
import { useState } from 'react';
import { ReactComponent as PostModalSvg } from '../../assets/icon/more-vert.svg';

const Button = styled.button`
  background: none;
  border: none;
  margin: 8px;
  cursor: pointer;
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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ModalContent = styled.div<{ top: number; left: number }>`
  position: fixed;
  top: ${(props) => props.top + 15}px;
  background-color: white;
  padding: 10px;
  margin-right: 35px;
  border-radius: 8px;
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

export const PostModalBtn = () => {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
    setModalOpen(!isModalOpen);
  };

  const handleEditClick = () => {
    // 수정하기 페이지로 이동
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    // 삭제하시겠습니까? 모달 창 띄우기
    setModalOpen(false);
  };

  // 바깥 영역을 클릭 시 모달이 닫힘
  const handleModalContainerClick = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleModalToggle}>
        <PostModalSvg />
      </Button>
      {isModalOpen && (
        <ModalContainer onClick={handleModalContainerClick}>
          <ModalContent top={modalPosition.y} left={modalPosition.x}>
            <OptionButton onClick={handleEditClick}>수정하기</OptionButton>
            <OptionButton onClick={handleDeleteClick}>삭제하기</OptionButton>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

