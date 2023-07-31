import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { styled } from 'styled-components';

const CommentInputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 5px 8px 0px rgba(0, 0, 0, 0.15);
`;

const CommentInputBox = styled.div`
  width: 360px;
  height: 45px;
  border-radius: 20px;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  width: 300px;
  height: 45px;
  background-color: var(--background-color);
  margin: 0px 15px;
  font-size: 16px;
  font-weight: light;
  color: var(--black-color);
  border: none;
  outline: none;
`;

const CommentButton = styled.button`
  flex: 0 0 auto;
  width: 60px;
  height: 45px;
  border-radius: 20px;
  background-color: var(--background-color);
  font-size: 16px;
  border: none;
  cursor: pointer;
  color: ${({ hasContent }) =>
    hasContent ? 'var(--primary-color)' : 'var(--gray-color)'};
`;

function CommentInputForm() {
  const [commentContent, setCommentContent] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = () => {
    // 댓글 등록 처리 로직
    // 등록 후 댓글 입력창을 초기화
    setCommentContent('');
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <CommentInputContainer>
      <CommentInputBox>
        <CommentInput
          value={commentContent}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="댓글을 입력해주세요."
        />
        <CommentButton
          hasContent={commentContent.trim().length > 0}
          onClick={handleCommentSubmit}
        >
          게시
        </CommentButton>
      </CommentInputBox>
    </CommentInputContainer>
  );
}

export default CommentInputForm;
