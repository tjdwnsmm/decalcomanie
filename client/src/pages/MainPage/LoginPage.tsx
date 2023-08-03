import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Main, MarginFrame } from '../../style';
import { RESTAPI_KEY } from '../../api/apikey';
import Logo from '../../components/common/Logo';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const redirect_uri = 'http://localhost:8080/oauth/kakao/callback'; // Redirect URI

  const kakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${RESTAPI_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const handleTokenResponse = () => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    if (code) {
      axios
        .post(
          'your_backend_endpoint',
          { code },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then((response) => {
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error handling tokens:', error);
        });
    }
  };

  // Call the function to handle the token response
  useEffect(() => {
    handleTokenResponse();
  }, []);

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
