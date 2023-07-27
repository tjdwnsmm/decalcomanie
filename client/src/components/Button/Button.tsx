import { styled } from 'styled-components';

export const PostButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--white-color);
  width: 340px;
  height: 50px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 5px gray;
  margin: 10px 0px;
  &:hover {
    cursor: pointer;
  }
`;

export const CancleButton = styled(PostButton)`
  background-color: var(--white-color);
  color: var(--primary-color);
  &:hover {
    cursor: pointer;
  }
`;
