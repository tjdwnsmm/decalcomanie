import { styled } from 'styled-components';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const modules = {
  toolbar: false,
};

const StyledReactQuill = styled(ReactQuill)`
  margin: 10px 0px 10px 0px;
  width: 340px;
  height: 180px;
  font-weight: bold;
  border-radius: 10px;
  background-color: var(--white-color);
  box-shadow: 2px 2px 2px var(--gray-color);

  .ql-container.ql-snow {
    border: none;
  }
`;

export default function ContextBox() {
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = () => {
    const data = {
      content: content,
    };

    axios.post('/sns/create', data)
      .then(response => {
        console.log('게시글이 성공적으로 작성되었습니다.', response.data);
      })
      .catch(error => {
        console.error('게시글 작성에 실패했습니다.', error);
      });
  };

  return (
    <>
      <StyledReactQuill modules={modules} value={content} onChange={handleChange} />
      <button onClick={handleSubmit}>게시글 작성</button>
    </>
  );
}