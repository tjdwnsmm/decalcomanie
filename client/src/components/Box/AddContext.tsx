import React, { useState, ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface ContextBoxProps {
  onContentChange: (content: string) => void;
}

const TextBox = styled.textarea`
  margin: 10px 0px 10px 0px;
  padding: 10px;
  width: 320px;
  height: 180px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 25px;
  background-color: var(--white-color);
  border: none;
  outline: none;
  resize: none;
`;

export default function ContextBox({ onContentChange }: ContextBoxProps) {
  const [content, setContent] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    onContentChange(event.target.value);
  };

  return (
    <>
      <TextBox value={content} onChange={handleChange} />
    </>
  );
}
