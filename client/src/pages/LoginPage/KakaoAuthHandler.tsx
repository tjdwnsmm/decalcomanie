import axios from 'axios';
import { useEffect } from 'react';
// import axios from '../../api/apiController';
import { useNavigate } from 'react-router-dom';

const KakaoAuthHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // URL로부터 코드 획득
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    const fetchTokens = async () => {
      try {
        // 서버로 코드를 보내고 응답 받기
        const response = await axios.get(`http://localhost:8080/oauth/signin`, {
          headers: {
            code: code,
          },
        });
        // console.log(response.headers);
        const data = response.data;

        // 응답 헤더에서 Access Token과 Refresh Token 추출
        const accessToken = response.headers['accesstoken'];
        const refreshToken = response.headers['refreshtoken'];

        //localstorage 에 저장하고 home 으로 이동
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('nickname', data.nickname);
        navigate('/');
        /**
         *  콘솔에 출력
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
         * */

        //
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // fetchTokens 함수 실행
    fetchTokens();
  }, []);

  return (
    <div>
      {/* 이 컴포넌트는 렌더링이 필요하지 않으므로 내용이 없어도 됩니다. */}
    </div>
  );
};

export default KakaoAuthHandler;
