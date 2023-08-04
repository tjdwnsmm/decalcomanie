import React from 'react';
import styled from 'styled-components';
import { CenterFrame, ConfirmButton, MarginFrame } from '../../style';

interface ActionButtonsProps {
  handleOpenModal: () => void;
  handleFeed: () => void;
  handleBack: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleOpenModal,
  handleFeed,
  handleBack,
}) => {
  return (
    <MarginFrame margin="30px 0 20px ">
      <CenterFrame>
        <ConfirmButton fontWeight="600" onClick={handleOpenModal}>
          자세한 노트 정보 확인하기
        </ConfirmButton>
      </CenterFrame>
      <MarginFrame margin="10px"></MarginFrame>
      <CenterFrame>
        <ConfirmButton
          color="primary"
          background="primary"
          fontWeight="500"
          onClick={handleFeed}
        >
          다른 사용자들의 글을 구경해보세요
        </ConfirmButton>
      </CenterFrame>
      <CenterFrame>
        <BackToList onClick={handleBack}>목록으로 돌아가기</BackToList>
      </CenterFrame>
    </MarginFrame>
  );
};

export default ActionButtons;

const BackToList = styled.div`
  color: var(--primary-color);
  margin-top: 18px;
  font-weight: 700;
`;
