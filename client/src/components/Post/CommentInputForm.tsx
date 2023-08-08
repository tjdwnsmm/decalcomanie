import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { styled } from 'styled-components';
import axios, { USERID } from '../../api/apiController';

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
interface CommentButtonProps {
  hasContent: boolean; // Add the hasContent prop and define its type
}

const CommentButton = styled.button<CommentButtonProps>`
  flex: 0 0 auto;
  width: 60px;
  height: 45px;
  border-radius: 20px;
  background-color: var(--background-color);
  font-size: 16px;
  border: none;
  cursor: ${({ hasContent }) => (hasContent ? 'pointer' : '')};
  color: ${({ hasContent }) =>
    (hasContent ? 'var(--primary-color)' : 'var(--gray-color)')};
`;

function CommentInputForm({ articleId }: { articleId: number }) {
  const [commentContent, setCommentContent] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (commentContent.trim().length > 0) {
      try {
        const response = await axios.post('/sns/comment/create', {
          articleId,
          content: commentContent,
          userId: USERID,
        });

        console.log('댓글이 등록되었습니다:', response.data);

        setCommentContent('');
      } catch (error) {
        console.error('댓글 등록 중 오류:', error);
      }
    }
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
