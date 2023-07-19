import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FilteringSvg } from '../../assets/icon/filtering.svg';

interface FilteringBtnProps {
  onToggleModal: () => void;
  filteringNum: number;
}

const FilteringBtn: React.FC<FilteringBtnProps> = ({
  onToggleModal,
  filteringNum,
}) => {
  const handleModal = () => {
    // setModal(!isModal);
    onToggleModal();
  };
  return (
    <Button onClick={handleModal}>
      {filteringNum === 0
        ? '필터링'
        : `총 ${filteringNum}개의 필터링 결과입니다`}
      <FilteringSvg />
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
`;

export default FilteringBtn;
