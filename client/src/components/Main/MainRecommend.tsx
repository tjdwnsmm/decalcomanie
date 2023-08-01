import { styled } from 'styled-components';
import { MarginFrame } from '../../style';

const UserInfo = {
  name: '김수민',
  weather: 0,
  scent: 0,
};

const MainRecommend = () => {
  return (
    <MarginFrame margin="0 30px 0">
      <UserName>{UserInfo.name} 님,</UserName>
      <ScentInfo>
        <AccentText>이런 향수는 어떠신가요?</AccentText>
        서랍에 담긴 향수들을 기반으로 추천드려요 🙂
      </ScentInfo>
    </MarginFrame>
  );
};

export default MainRecommend;

export const UserName = styled.div`
  display: flex;
  margin-top: 40px;
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
  margin-top: 5px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.44px;
`;

const AccentText = styled.div`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 0.6px;
  margin-bottom: 10px;
`;
