import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import { UserName, WeatherInfo } from './MainRecommend';

interface Props {
  nickname: string;
}

const NoRecommend = ({ nickname }: Props) => {
  return (
    <MarginFrame margin="30px 30px 0">
      <UserName>{nickname} 님,</UserName>
      <DrawerInfo>서랍에 향수가 없으시네요? </DrawerInfo>
      <MoreInfo>가지고 있는 향수를 등록해주세요!</MoreInfo>
    </MarginFrame>
  );
};

export default NoRecommend;

const DrawerInfo = styled(WeatherInfo)`
  color: var(--black-color);
  margin-top: 8px;
  font-size: 27px;
`;

const MoreInfo = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 18px;
`;
