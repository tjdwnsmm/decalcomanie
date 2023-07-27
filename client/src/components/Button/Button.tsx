import { styled } from 'styled-components';

export const PostButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--white-color);
  width: 330px;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 5px var(--gray-color);
  margin: 15px 30px;
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