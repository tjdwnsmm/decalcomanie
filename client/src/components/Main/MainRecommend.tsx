import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import { ReactComponent as ArrowSvg } from '../../assets/icon/nextArrow.svg';
import { useNavigate } from 'react-router';
import Logo from '../common/Logo';
const UserInfo = {
  name: '김수민',
  weather: 0,
  scent: 0,
};

const MainRecommend = () => {
  const navigate = useNavigate();
  const handleDrawer = () => {
    navigate('my-drawer');
  };
  return (
    <MarginFrame margin="0 30px 35px">
      <Frame>
        <LeftSection>
          <UserName>{UserInfo.name} 님,</UserName>
          <ScentInfo>
            <AccentText>
              <div>오늘의 추천 향수를 </div>
              <div>만나보세요 🖐</div>
            </AccentText>
          </ScentInfo>
        </LeftSection>
        <RightSection>
          <Logo />
        </RightSection>
      </Frame>
      <GoToDrawer onClick={handleDrawer}>
        내 서랍 보기 <ArrowSvg />
      </GoToDrawer>
    </MarginFrame>
  );
};

export default MainRecommend;

const Frame = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
`;
const LeftSection = styled.div``;
const RightSection = styled.div`
  margin-top: -30px;
`;
export const UserName = styled.div`
  display: flex;
  margin-top: 50px;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.44px;
`;

export const WeatherInfo = styled.div`
  margin-top: 18px;
  color: var(--primary-color);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 0.6px;
`;
const ScentInfo = styled.div`
  margin-top: 8px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.44px;
`;

const AccentText = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.6px;
  margin-bottom: 10px;
  margin-top: 5px;
  span {
  }
`;

const GoToDrawer = styled.div`
  color: var(--primary-color);
  margin: 10px 0 0 5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  svg g path {
    stroke: var(--primary-color);
  }

  svg {
    margin-top: 2px;
    width: 20px;
    height: 30px;
  }
`;
