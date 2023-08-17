import { styled } from 'styled-components';
import { FloatingButton } from './FloatingWriteBtn';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DrawerSvg } from '../../assets/img/perfume-drawer.svg';
const FloatingDrawerBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/my-drawer');
  };

  return (
    <>
      <FloatingDrawerButton onClick={handleClick}>
        <DrawerSvg />
      </FloatingDrawerButton>
    </>
  );
};

export default FloatingDrawerBtn;

const FloatingDrawerButton = styled(FloatingButton)`
  width: 70px;
  height: 70px;
  svg {
    width: 32px;
  }
`;
