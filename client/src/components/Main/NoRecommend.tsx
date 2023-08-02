import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import { UserName, WeatherInfo } from './MainRecommend';

const UserInfo = {
  name: '김수민',
  weather: 0,
  scent: 0,
};

const NoRecommend = () => {
  return (
    <MarginFrame margin="0 30px 0">
      <UserName>{UserInfo.name} 님,</UserName>
      <DrawerInfo>서랍에 향수가 없으시네요? </DrawerInfo>
      <MoreInfo>가지고 있는 향수를 등록해주세요!</MoreInfo>
    </MarginFrame>
  );
};

export default NoRecommend;

const DrawerInfo = styled(WeatherInfo)`
  color: var(--black-color);
`;

const MoreInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`;
