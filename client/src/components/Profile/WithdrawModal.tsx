import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';

interface WithdrawProps {
  closeModal: () => void;
}

const WithdrawModal = ({ closeModal }: WithdrawProps) => {
  const navigate = useNavigate();
  const handleWithdraw = async () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      try {
        const response = await axios.delete('/user/withdrawal');
        if (response) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('nickname');
          localStorage.removeItem('sort');
        }
        navigate('/login');
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ModalBackground onClick={closeModal}>
      <Modal>
        <ModalTitle>Decalcomanie 탈퇴하기</ModalTitle>
        <ModalContent>
          탈퇴하기 버튼을 누르면 회원님의 정보가 즉시 삭제되며, 복구할 수
          없습니다.
          <br />
          <br />
          정말로 탈퇴하시겠습니까?
        </ModalContent>
        <Option>
          <ModalButton onClick={closeModal}>취소</ModalButton>
          <ModalButton color="error" onClick={handleWithdraw}>
            탈퇴하기
          </ModalButton>
        </Option>
      </Modal>
    </ModalBackground>
  );
};

export default WithdrawModal;

const ModalTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: var(--dark-gray-color);
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const ModalButton = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: var(--${(props) => props.color || 'dark-gray'}-color);
  cursor: pointer;
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
  z-index: 2;
`;

const Modal = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 25px 25px 20px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: height 0.3s; /* Add height transition */
`;
