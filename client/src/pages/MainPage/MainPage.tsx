import { useState } from 'react';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';
import RecommendPerfume from '../../components/Main/RecommendPerfume';
import { styled } from 'styled-components';
import { ReactComponent as ArrowSvg } from '../../assets/icon/nextArrow.svg';
import NoRecommend from '../../components/Main/NoRecommend';

const MainPage = () => {
  const [isDrawer, setDrawer] = useState(false);

  return (
    <Main>
      {isDrawer ? (
        <>
          <MainRecommend />
          <RecommendPerfume />
          <RecommendButton>
            이미지별 추천을 원하시나요 ?<ArrowSvg />
          </RecommendButton>
        </>
      ) : (
        <>
          <NoRecommend />
          <MarginFrame margin="20px auto">
            <CenterFrame>
              <ConfirmButton color="primary" background="primary">
                내 향수 찾으러 가기
              </ConfirmButton>
            </CenterFrame>
          </MarginFrame>
        </>
      )}
    </Main>
  );
};

export default MainPage;

const RecommendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 225px;
  height: 16px;
  margin: 15px auto;
  border-radius: 5px;
  background: var(--primary-color);
  color: var(--white-color);
  padding: 9px 13px;
  font-size: 13px;
  font-weight: 500;
`;
