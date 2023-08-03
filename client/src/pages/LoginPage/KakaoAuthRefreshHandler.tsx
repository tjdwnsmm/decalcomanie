import React, { useEffect } from 'react';
import axios from 'axios';
import { USERID } from '../../api/apiController';
import { RESTAPI_KEY } from '../../api/apikey';

const KakaoAuthRefreshHandle = () => {
  useEffect(() => {
    // URL로부터 코드 획득
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?
        grant_type=authorization_code
        &client_id=${RESTAPI_KEY}
        &redirect_uri=http://localhost:5173/oauth/kakao/callback
        &code=${code}`,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => {
        console.log(res);
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
      });
  }, []);

  return (
    <div>
      {/* 이 컴포넌트는 렌더링이 필요하지 않으므로 내용이 없어도 됩니다. */}
    </div>
  );
};

export default KakaoAuthRefreshHandle;
