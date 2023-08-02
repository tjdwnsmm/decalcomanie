import { styled } from 'styled-components';
import { Main, MarginFrame } from '../../style';
import { RESTAPI_KEY } from '../../api/apikey';

const LoginPage = () => {
  const redirect_uri = 'http://localhost:8080/oauth/kakao/callback'; //Redirect URI

  const kakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${RESTAPI_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = kakaoAuthUrl;

    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
  };

  return (
    <Main>
      <MarginFrame margin="100px 0">
        <KakaoBox onClick={kakaoLogin}>
          <img id="icon-img" src="src/assets/img/kakao_logo.png" />
          카카오톡으로 로그인
        </KakaoBox>
      </MarginFrame>
    </Main>
  );
};

export default LoginPage;

const KakaoBox = styled.div`
  width: 100%;
  height: 44px;
  margin-bottom: 8px;
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
