import { useState } from 'react';
import { Main } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';

const MainPage = () => {
  const [isDrawer, setDrawer] = useState(true);

  return (
    <Main>
      {isDrawer ? (
        <>
          <MainRecommend />
        </>
      ) : (
        <></>
      )}
    </Main>
  );
};

export default MainPage;
