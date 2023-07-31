import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as SuccessSvg } from '../../assets/icon/success.svg';
import { ReactComponent as ErrorSvg } from '../../assets/icon/error.svg';

const NicknameInputContainer = styled.div`
  margin: 8px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const NicknameInput = styled.input`
  width: 220px;
  background-color: var(--background-color);
  font-size: 15px;
  font-weight: 400;
  color: var(--black-color);
  border: none;
  outline: none;
  border-bottom: 2px solid var(--gray-color);
`;

const CheckeBtn = styled.button<{ disabled?: boolean }>`
  background-color: var(--background-color);
  border: none;
  font-size: 15px;
  color: var(--success-color);
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Message = styled.div<{ isDuplicate?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 6px;
  gap: 5px;
  color: ${(props) => (props.isDuplicate ? 'var(--error-color)' : 'var(--success-color)')};
`;

interface NewNicknameProps {
  nickname: string;
}

function NewNickname({ nickname }: NewNicknameProps) {
  const [inputValue, setInputValue] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDuplicate(false);
    setIsCheck(false);
  };

  const handleCheckDuplicate = () => {
    // 서버와 통신하여 닉네임 중복 검사를 진행하는 로직 구현
    // 임시) 새로운 닉네임이 윤지현인 경우에만 중복으로 간주
    setIsDuplicate(inputValue === '윤지현');
    setIsCheck(true);
  };

  return (
    <>
      <NicknameInputContainer>
        <NicknameInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCheckDuplicate();
            }
          }}
          placeholder={nickname}
        />
        <CheckeBtn disabled={!inputValue.trim()} onClick={handleCheckDuplicate}>
          중복 검사
        </CheckeBtn>
      </NicknameInputContainer>
      {isCheck && (
        <Message isDuplicate={isDuplicate}>
          {isDuplicate ? <ErrorSvg /> : <SuccessSvg />}
          {isDuplicate ? '이미 사용중인 닉네임입니다.' : '사용 가능한 닉네임입니다.'}
        </Message>)}
    </>
  );
}

export default NewNickname;
