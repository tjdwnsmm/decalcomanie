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
      <MarginFrame margin="260px 0 0">
        <Logo />
        <LogoTitle>
          <div>Decalcomanie</div>
          <div>Decalcomanie</div>
        </LogoTitle>
        <LogoSubTitle>나에게 딱 맞는 향수를 만나보세요</LogoSubTitle>
      </MarginFrame>
      <MarginFrame margin="230px 0 0">
        <KakaoBox onClick={kakaoLogin}>
          <KakaoSvg />
          {/* <img id="icon-img" src="src/assets/img/kakao_logo.png" /> */}
          카카오톡으로 시작하기
        </KakaoBox>
      </MarginFrame>
    </MainInLogin>
  );
};

export default LoginPage;

const MainInLogin = styled(Main)`
  // background-color: var(--secondary-color);
  background: linear-gradient(
    180deg,
    #1c1c1c 0%,
    rgba(51, 41, 77, 1) 33.33%,
    rgba(51, 41, 77, 1) 38.02%,
    rgba(51, 41, 77, 0.94) 53.65%,
    #6d51b4 100%
  );
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
  margin: auto;
  margin-top: -10px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
  padding: -80px 10px;

  * {
    font: bolder 3.2rem/3.2rem 'EB Garamond' !important;
    background-image: url('https://cdn.pixabay.com/photo/2022/06/21/21/16/pink-7276513_1280.jpg');
    -webkit-background-clip: text;
    color: transparent;
    // color: var(--primary-color);
    overflow: hidden;
  }

  :last-child {
    transform: rotatex(180deg) translatey(15px);
    mask-image: linear-gradient(transparent 50%, white 90%);
    -webkit-mask-image: linear-gradient(transparent 48%, white 100%);

    // transform: rotatex(180deg) translatey(15px);
    // mask-image: repeating-linear-gradient(
    //     transparent,
    //     transparent 3px,
    //     white 3px,
    //     white 4px
    //   ),
    //   linear-gradient(transparent 50%, white 90%);
    // -webkit-mask-image: repeating-linear-gradient(
    //     transparent,
    //     transparent 3px,
    //     white 3px,
    //     white 4px
    //   ),
    //   linear-gradient(transparent 50%, white 90%);
  }
`;

const LogoSubTitle = styled.div`
  margin-top: -35px;
  color: rgba(249, 202, 245, 0.66);
  text-align: center;
  font-weight: 500;
  font-size: 13px;
`;
