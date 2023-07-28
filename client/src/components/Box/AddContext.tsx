import React, { useState } from 'react';
import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: false,
};

const StyledReactQuill = styled(ReactQuill)`
  margin: 10px 0px 10px 0px;
  padding: 10px;
  width: 320px;
  height: 180px;
  font-weight: 500;d
  border-radius: 10px;
  line-height: 25px;
  background-color: var(--white-color);

  .ql-container.ql-snow {
    border: none;
  }
`;

export default function ContextBox() {
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <StyledReactQuill
        modules={modules}
        value={content}
        onChange={handleChange}
      />
    </>
  );
}
