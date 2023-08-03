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
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response 🧑
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response);
    //401 에러면 refresh token 보내기
    if (error.response.status === 401 && getRefreshToken()) {
      const navigate = useNavigate();
      try {
        const response = await axios.post(`/oauth/reissue`, {
          refreshToken: getRefreshToken(),
        });

        //access token 을 다시 setting 하고 origin request 를 재요청
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // 만약 refreshToken 보내도 error 가 뜨면 login 화면으로 보내기 -> redirect
        console.log('Error refreshing token:', error);

        navigate('/login'); // 로그인화면으로 보내기
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
