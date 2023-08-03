import { styled } from 'styled-components';
import { Main, MarginFrame } from '../../style';
import Logo from '../../components/common/Logo';
import { KAKAO_AUTH_URL } from './KakaoAuth';

const LoginPage = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <MainInLogin>
      <MarginFrame margin="280px 0 0">
        <Logo />
      </MarginFrame>
      <MarginFrame margin="550px 0 0">
        <KakaoBox onClick={kakaoLogin}>
          <img id="icon-img" src="src/assets/img/kakao_logo.png" />
          카카오톡으로 로그인
        </KakaoBox>
      </MarginFrame>
    </MainInLogin>
  );
};

export default LoginPage;

const MainInLogin = styled(Main)`
  background-color: var(--secondary-color);
`;

const KakaoBox = styled.div`
  width: 340px;
  height: 44px;
  margin: auto;
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  color: #000000cb;
  background-color: #fee500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    margin-right: 2%;
    margin-top: 6px;
    margin-bottom: 6px;
    width: 40px;
  }
`;
