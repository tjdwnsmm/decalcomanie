import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as SuccessSvg } from '../../assets/icon/success.svg';
import { ReactComponent as ErrorSvg } from '../../assets/icon/error.svg';
import axios from '../../api/apiController';

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

const Message = styled.div<{ available?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 6px;
  gap: 5px;
  color: ${(props) => (props.available ? 'var(--success-color)' : 'var(--error-color)')};
`;

interface NewNicknameProps {
  nickname: string;
}

function NewNickname({ nickname }: NewNicknameProps) {
  const [inputValue, setInputValue] = useState('');
  // 새로운 닉네임이 사용할 수 있는 닉네임인지(중복인지 아닌지)
  const [isAvailable, setIsAvailable] = useState(false);
  // 중복검사 후 메세지 띄우기 위해
  const [isCheck, setIsCheck] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsAvailable(false);
    setIsCheck(false);
    setNewNickname(nickname);
  };

  const handleCheckDuplicate = async () => {
    // 서버와 통신하여 닉네임 중복 검사를 진행하는 로직 구현
    try {
      const response = await axios.get(`/user/update/check/${inputValue}`);
      setIsAvailable(response.data.available);
      setIsCheck(true);
      if (isAvailable) {
        setNewNickname(inputValue);
      }
    } catch (error) {
      console.error('오류:', error);
    }
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
        <Message available={isAvailable}>
          {isAvailable ? <SuccessSvg /> : <ErrorSvg />}
          {isAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용중인 닉네임입니다.'}
        </Message>)}
    </>
  );
}

export default NewNickname;
