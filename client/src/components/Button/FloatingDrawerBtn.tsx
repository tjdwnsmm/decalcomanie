import { styled } from 'styled-components';
import { FloatingButton } from './FloatingWriteBtn';
import { useNavigate } from 'react-router-dom';

const FloatingDrawerBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/my-drawer');
  };

  return (
    <>
      <FloatingDrawerButton onClick={handleClick}>
        <img src="src/assets/img/drawer-float.png" />
      </FloatingDrawerButton>
    </>
  );
};

export default FloatingDrawerBtn;

const FloatingDrawerButton = styled(FloatingButton)`
  width: 70px;
  height: 70px;
  img {
    width: 32px;
  }
`;
