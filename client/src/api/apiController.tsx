import axios from 'axios';
import { useNavigate } from 'react-router';

export const USERID = '07161c43-bc03-44f6-95c1-a56d440a23bf';
// axios.defaults.withCredentials = true;
export const BASE_URL = 'http://localhost:8080';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    userId: USERID,
  },
});

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

//Request 🧑
instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    console.log(`보내기 > ${accessToken}`);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response 🧑
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response, error.response.data.status, getRefreshToken());
    //401 에러면 refresh token 보내기
    if (error?.response?.data?.status === 401) {
      console.log('access-token 만료됐어');
      try {
        console.log('refresh-token 보낼게!');
        const response = await axios.get(
          `http://localhost:8080/oauth/reissue`,
          {
            headers: {
              refreshToken: getRefreshToken(),
            },
          },
        );

        // 응답 헤더에서 Access Token과 Refresh Token 추출
        const accessToken = response.headers['accesstoken'];
        const refreshToken = response.headers['refreshtoken'];

        //access token 을 다시 setting 하고 origin request 를 재요청
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        //새로운 토큰 발급 확인
        console.log(accessToken, refreshToken);

        return axios(originalRequest);
      } catch (error) {
        // 만약 refreshToken 보내도 error 가 뜨면 login 화면으로 보내기 -> redirect
        console.log('Error refreshing token:', error);

        window.location.href = '/login'; // 로그인화면으로 보내기
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } else if (error?.response?.data?.status === 403) {
      //access token 자체를 안보낸 경우
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default instance;
