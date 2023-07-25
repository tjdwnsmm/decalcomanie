import { styled } from 'styled-components';
import { MarginFrame } from '../../style';

const UserInfo = {
  name: '김수민',
  weather: 0,
  scent: 0,
};

const weatherTitle = ['햇살이 따스한 오늘 🌞'];

const scentTitle = ['경쾌하고 상큼한 시트러스'];

const MainRecommend = () => {
  return (
    <MarginFrame margin="0 30px 0">
      <UserName>{UserInfo.name} 님,</UserName>
      <WeatherInfo>{weatherTitle[UserInfo.weather]}</WeatherInfo>
      <ScentInfo>
        <AccentText>{scentTitle[UserInfo.scent]}</AccentText>
        어떠신가요?
      </ScentInfo>
    </MarginFrame>
  );
};

export default MainRecommend;

const UserName = styled.div`
  display: flex;
  margin-top: 40px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.44px;
`;

const WeatherInfo = styled.div`
  margin-top: 18px;
  color: var(--primary-color);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 0.6px;
`;
const ScentInfo = styled.div`
  margin-top: 5px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.44px;
`;

const AccentText = styled.div`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 0.6px;
  margin-bottom: 10px;
  &:after {
    content: '';
    position: absolute;
    left: 30px;
    width: 80%;
    height: 10px;
    background-color: var(--secondary-color);
    top: 160px;
    z-index: -1;
    border-radius: 10px;
  }
`;
