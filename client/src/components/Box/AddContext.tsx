import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  return (
    <>
      <StyledReactQuill modules={modules}></StyledReactQuill>
    </>
  );
}
