import styled from 'styled-components';

const FloatingWriteBtn = () => {
  const handleClick = () => {
    // 플로팅 버튼 클릭 시 동작할 함수 작성
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
  bottom: 20px;
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
