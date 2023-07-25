import { useState } from 'react';
import { Main } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';
import RecommendPerfume from '../../components/Main/RecommendPerfume';
import { styled } from 'styled-components';
import { ReactComponent as ArrowSvg } from '../../assets/icon/nextArrow.svg';

const MainPage = () => {
  const [isDrawer, setDrawer] = useState(true);

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
        <></>
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
