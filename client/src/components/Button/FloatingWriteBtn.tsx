import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FloatingWriteBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/post');
  };

  return (
    <>
      <FloatingButton onClick={handleClick}>
        <img src="src/assets/img/pencil-float.png" />
      </FloatingButton>
    </>
  );
};

export default FloatingWriteBtn;

export const FloatingButton = styled.div`
  position: fixed;
  bottom: 85px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: var(--white-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
