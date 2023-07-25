import { useState } from 'react';
import { Main } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';
import RecommendPerfume from '../../components/Main/RecommendPerfume';

const MainPage = () => {
  const [isDrawer, setDrawer] = useState(true);

  return (
    <Main>
      {isDrawer ? (
        <>
          <MainRecommend />
          <RecommendPerfume />
        </>
      ) : (
        <></>
      )}
    </Main>
  );
};

export default MainPage;
