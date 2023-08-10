import { keyframes, styled } from 'styled-components';
import { Main, MarginFrame } from '../../style';
import Logo from '../../components/common/Logo';
import { KAKAO_AUTH_URL } from './KakaoAuth';
import { ReactComponent as KakaoSvg } from '../../assets/img/KakaoTalk_logo.svg';
const LoginPage = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <MainInLogin>
      <MarginFrame margin="250px 0 0">
        <Logo />
        <LogoTitle>
          <div>Decalcomanie</div>
          <div>Decalcomanie</div>
        </LogoTitle>
        <LogoSubTitle>나에게 딱 맞는 향수를 만나보세요</LogoSubTitle>
      </MarginFrame>
      <MarginFrame margin="300px 0 0">
        <KakaoBox onClick={kakaoLogin}>
          <KakaoSvg />
          {/* <img id="icon-img" src="src/assets/img/kakao_logo.png" /> */}
          카카오톡으로 시작하기
        </KakaoBox>
      </MarginFrame>
      <Info>
        <a href="https://www.freepik.com/free-vector/realistic-podium-lilac-pastel-background_29719937.htm#page=18&query=3d%20illustration%20perfume&position=41&from_view=search&track=ais">
          @ Image by pikisuperstar
        </a>{' '}
        on Freepik
      </Info>
    </MainInLogin>
  );
};

export default LoginPage;

const Info = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 10px;
  color: var(--white-color);
  a {
    color: var(--white-color);
    text-decoration-line: none;
  }
`;

const MainInLogin = styled(Main)`
  background-image: url('assets/img/main_bg_2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
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

  svg {
    margin-right: 2%;
    margin-top: 6px;
    margin-bottom: 6px;
    width: 40px;
    height: 40px;
  }
`;

const LogoTitle = styled.div`
  width: max-content;
  position: relative;
  top: -25px;
  margin: auto;
  margin-top: -10px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  pointer-events: none;

  * {
    letter-spacing: -0.75px;
    font: 500 3.2rem/3.2rem 'Pacifico' !important;
    color: transparent;
    background: linear-gradient(
      180deg,
      #1c1c1c 0%,
      rgba(51, 41, 77, 1) 33.33%,
      rgba(51, 41, 77, 1) 38.02%,
      rgba(51, 41, 77, 0.84) 43.65%,
      var(--primary-color) 100%
    );
    -webkit-background-clip: text;
    overflow: hidden;
  }

  :last-child {
    transform: rotatex(180deg) translatey(15px);
    mask-image: repeating-linear-gradient(
        transparent,
        transparent 3px,
        white 3px,
        white 4px
      ),
      linear-gradient(transparent 50%, white 90%);
    -webkit-mask-image: repeating-linear-gradient(
        transparent,
        transparent 10px,
        white 1px,
        white 4px
      ),
      linear-gradient(transparent 60%, white 90%);
  }
`;

const LogoSubTitle = styled.div`
  margin-top: -68px;
  color: var(--secondary-color);
  text-align: center;
  font-weight: 800;
  font-size: 14px;
`;
