import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PostModalSvg } from '../../assets/icon/more-vert.svg';
import axios from '../../api/apiController';
import { commentDto } from '../../types/PostInfoType';

const Button = styled.button`
  background: none;
  border: none;
  margin: 8px;
  cursor: pointer;
`;

const ModalContainer = styled.div<{ justify: string; align : string;}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ModalContent = styled.div<{ top: number; }>`
  position: fixed;
  top: ${(props) => props.top + 15}px;
  background-color: white;
  padding: 10px;
  margin-right: 35px;
  border-radius: 8px;
`;

const OptionButton = styled.button<{ text: string; }>`
background-color: transparent;
border: none;
cursor: pointer;
font-size: 16px;
font-weight: 500;
padding: 8px;
width: 100%;
text-align: ${(props) => props.text};

&:hover {
  background-color: var(--gray-color);
}
`;

const ConfirmModalContent = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
`;

const ConfirmationText = styled.p`
  font-weight: 600;
  padding: 0px 30px;
`;

interface CommentModalBtnProps {
  comment: commentDto;
  isEditing: boolean;
  setEditing: (isEditing: boolean) => void;
}

const CommentModalBtn = ({ comment, isEditing, setEditing }: CommentModalBtnProps) => {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const handleModalToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
    setModalOpen(!isModalOpen);
  };

  const handleEditClick = () => {
    setEditing(true);
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    // 삭제하시겠습니까? 모달 창 띄우기
    setConfirmationOpen(true);
    setModalOpen(false);
  };

  // 바깥 영역을 클릭 시 모달이 닫힘
  const handleModalContainerClick = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const requestData = {
        commentId: comment.commentId,
        articleId: comment.articleId,
      };
      const response = await axios.delete(`/sns/comment/delete/${comment.commentId}`, requestData);
      console.log(response.data);
      setConfirmationOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleModalToggle}>
        <PostModalSvg />
      </Button>
      {isModalOpen && (
        <ModalContainer justify="right" align="start" onClick={handleModalContainerClick}>
          <ModalContent top={modalPosition.y}>
            <OptionButton text='left' onClick={handleEditClick}>수정하기</OptionButton>
            <OptionButton text='left' onClick={handleDeleteClick}>삭제하기</OptionButton>
          </ModalContent>
        </ModalContainer>
      )}
      {isConfirmationOpen && (
        <ModalContainer justify="center" align="center">
          <ConfirmModalContent>
            <ConfirmationText>삭제하시겠습니까?</ConfirmationText>
            <OptionButton text="center" onClick={handleConfirmDelete}>확인</OptionButton>
            <OptionButton text="center" onClick={() => setConfirmationOpen(false)}>취소</OptionButton>
          </ConfirmModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default CommentModalBtn;
