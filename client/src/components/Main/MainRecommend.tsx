import { styled } from 'styled-components';
import { MarginFrame } from '../../style';

const UserInfo = {
  name: '김수민',
  weather: 0,
  scent: 0,
};

const favScent = ['시트러스', '프레시 스파이시', '아로마틱'];

const MainRecommend = () => {
  return (
    <MarginFrame margin="0 30px 40px">
      <UserName>{UserInfo.name} 님,</UserName>
      <ScentInfo>
        <AccentText>
          <span>이런 향수 어떠세요 ?</span>
        </AccentText>
        {/* 서랍에 담긴 향수들을 기반으로 추천드려요 🙂 */}
      </ScentInfo>
    </MarginFrame>
  );
};

export default MainRecommend;

export const UserName = styled.div`
  display: flex;
  margin-top: 45px;
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

  span {
  }
`;
