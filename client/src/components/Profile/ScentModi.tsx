import React, { useState } from 'react';
import { styled } from 'styled-components';

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
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  color: var(--primary-color);
  input::placeholder {
    color: white;
  }
`;

const AddButton = styled.div`
  padding: 0px 4px;
  margin-left: 10px;
  border: 2px solid var(--success-color);
  border-radius: 7px;
  font-size: 14px;
  color: var(--success-color);
`;

function ScentModi({ scents, fav }: ScentModiProps) {
  const [scentList, setScentList] = useState(scents);
  const [newScent, setNewScent] = useState('');

  const handleDeleteScent = (index: number) => {
    const updatedScents = scentList.filter((_, idx) => idx !== index);
    setScentList(updatedScents);
  };

  const handleAddScent = () => {
    if (newScent.trim() !== '') {
      setScentList([...scentList, newScent]);
      setNewScent('');
    }
  };

  return (
    <>
      <ScentList>
        {scentList.map((scent, idx) => (
          <ScentItem key={idx}>
            {scent}
            <DeleteButton onClick={() => handleDeleteScent(idx)}>X</DeleteButton>
          </ScentItem>
        ))}
      </ScentList>
      <AddScent>
        <ScentInput
          placeholder={`${fav} 향 계열을 선택해주세요`}
          value={newScent}
          onChange={(e) => setNewScent(e.target.value)}
        />
        <AddButton onClick={handleAddScent}>+</AddButton>
      </AddScent>
    </>
  );
}

export default ScentModi;
