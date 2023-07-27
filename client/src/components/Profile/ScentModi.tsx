import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';

interface ScentModiProps {
  scents: string[];
  fav :string;
}

const ScentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ScentItem = styled.div`
  background-color: var(--primary-color);
  color: var(--white-color);
  padding: 6px 12px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const DeleteButton = styled.div`
  padding: 0px 4px;
  margin-left: 10px;
  border: 2px solid var(--white-color);
  border-radius: 7px;
  font-size: 14px;
`;

const AddScent = styled.div`
  margin-top: 10px;
  display: flex;
`;

const ScentInput = styled.input`
  width: auto;
  flex-grow: 1;
  background-color: var(--background-color);
  font-size: 15px;
  font-weight: 400;
  color: var(--black-color);
  border: none;
  outline: none;
  border-bottom: 2px solid var(--gray-color);

  &::placeholder {
    color: var(--primary-color);
  }
`;

const AddButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  padding: 0px 4px;
  margin: 1px 6px;
  border: 2px solid var(--success-color);
  border-radius: 7px;
  font-size: 14px;
  font-weight: 700;
  color: var(--success-color);
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const MaxScentMessage = styled.div`
  font-size: 12px;
  color: var(--error-color);
  margin-top: 4px;
`;

function ScentModi({ scents, fav }: ScentModiProps) {
  const [scentList, setScentList] = useState(scents);
  const [newScent, setNewScent] = useState('');
  const [showMaxScentMessage, setShowMaxScentMessage] = useState(false);

  const handleDeleteScent = (index: number) => {
    const updatedScents = scentList.filter((_, idx) => idx !== index);
    setScentList(updatedScents);
  };

  const handleAddScent = () => {
    if (scentList.length >= 3) {
      setShowMaxScentMessage(true);
      return;
    }

    setShowMaxScentMessage(false);

    if (newScent.trim() !== '') {
      setScentList([...scentList, newScent]);
      setNewScent('');
    }
  };

  return (
    <MarginFrame margin="8px 6px">
      <ScentList>
        {scentList.map((scent, idx) => (
          <ScentItem key={idx}>
            {scent}
            <DeleteButton onClick={() => handleDeleteScent(idx)}>x</DeleteButton>
          </ScentItem>
        ))}
      </ScentList>
      <AddScent>
        <ScentInput
          placeholder={`${fav} 향 계열을 입력해주세요.`}
          value={newScent}
          onChange={(e) => setNewScent(e.target.value)}
          onKeyPress={handleAddScent}
        />
        <AddButton onClick={handleAddScent} disabled={!newScent}>+</AddButton>
      </AddScent>
      {showMaxScentMessage && (
        <MaxScentMessage>향 계열은 최대 3개까지만 추가할 수 있습니다.</MaxScentMessage>
      )}
    </MarginFrame>
  );
}

export default ScentModi;
