import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import { ReactComponent as ArrowSvg } from '../../assets/icon/nextArrow.svg';
import { useNavigate } from 'react-router';
const UserInfo = {
  name: '김수민',
  weather: 0,
  scent: 0,
};

const favScent = ['시트러스', '프레시 스파이시', '아로마틱'];

const MainRecommend = () => {
  const navigate = useNavigate();
  const handleDrawer = () => {
    navigate('my-drawer');
  };
  return (
    <MarginFrame margin="0 30px 35px">
      <UserName>{UserInfo.name} 님,</UserName>
      <ScentInfo>
        <AccentText>
          <span>이런 향수는 어떠세요 ?</span>
        </AccentText>
        <GoToDrawer onClick={handleDrawer}>
          내 서랍 보기 <ArrowSvg />
        </GoToDrawer>
      </ScentInfo>
    </MarginFrame>
  );
};

export default MainRecommend;

export const UserName = styled.div`
  display: flex;
  margin-top: 50px;
  font-size: 22px;
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
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.6px;
  margin-bottom: 10px;
  margin-top: 10px;
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
