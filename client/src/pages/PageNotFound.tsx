import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../style';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleMain = () => {
    navigate('/');
  };
  return (
    <Main2>
      <CenterFrame2>
        <MarginFrame margin="150px auto">
          <Title>페이지 정보가 없어요 😭</Title>
          <ConfirmButton2 onClick={handleBack}>
            이전 페이지로 이동
          </ConfirmButton2>
          <ConfirmButton2 onClick={handleMain}>
            메인화면으로 이동
          </ConfirmButton2>
        </MarginFrame>
      </CenterFrame2>
    </Main2>
  );
};

export default PageNotFound;

const Main2 = styled(Main)`
  background-color: var(--secondary-color);
`;

const CenterFrame2 = styled(CenterFrame)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const ConfirmButton2 = styled(ConfirmButton)`
  margin-bottom: 10px;
  font-weight: 600;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
`;
