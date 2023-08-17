import React, { useState } from 'react';
import { styled } from 'styled-components';

const TextBox = styled.textarea`
  margin: 10px 0px 10px 0px;
  padding: 10px 15px;
  width: 310px;
  height: 180px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 25px;
  background-color: var(--white-color);
  border: none;
  outline: none;
  resize: none;
`;

interface ContextBoxProps {
  newContent: string;
  handleChange: (value: string) => void;
}

export default function ContextBox({
  newContent,
  handleChange,
}: ContextBoxProps) {
  // const [newContent, setContent] = useState(content);

  // const handleChange = (value: string) => {
  //   setContent(value);
  // };

  return (
    <>
      <TextBox
        value={newContent}
        onChange={(event) => handleChange(event.target.value)}
      />
    </>
  );
}
