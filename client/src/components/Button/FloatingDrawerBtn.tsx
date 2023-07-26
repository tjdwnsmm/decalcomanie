import { styled } from 'styled-components';
import { FloatingButton } from './FloatingWriteBtn';

const FloatingDrawerBtn = () => {
  const handleClick = () => {
    // 플로팅 버튼 클릭 시 동작할 함수 작성
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
  width: 84px;
  height: 84px;
`;
