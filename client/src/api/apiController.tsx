import axios from 'axios';

export const USERID = '07161c43-bc03-44f6-95c1-a56d440a23bf';
export const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER;

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

// Request 🧑
instance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    //console.log(`보내기 > ${accessToken}`);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // //console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response 🧑
instance.interceptors.response.use(
  async (response) => {
    // 요청이 성공했는지 확인하고, 성공한 경우에만 다음 요청으로 진행
    if (response.status === 200 || response.status === 201) {
      return response;
    } else {
      // 만약 200이나 201 아닌 경우, 에러 처리
      return Promise.reject(response);
    }
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 400 || error.response.status === 404) {
      window.location.href = '/pagenotfound';
    }
    // 401 에러면 refresh token 보내기
    if (error?.response?.data?.status === 401) {
      //!console 지우기
      // console.log('access-token 만료됐어');
      try {
        // console.log('refresh-token 보낼게!');
        const response = await axios.get(`${BASE_URL}/oauth/reissue`, {
          headers: {
            refreshToken: getRefreshToken(),
          },
        });

        // console.log('이전 access : ', getAccessToken());
        // console.log('이전 refresh : ', getRefreshToken());
        // 응답 헤더에서 Access Token과 Refresh Token 추출
        const accessToken = response.headers['accesstoken'];
        const refreshToken = response.headers['refreshtoken'];
        // console.log('이후 access : ', accessToken);
        // console.log('이후 refresh : ', refreshToken);
        // access token 을 다시 setting 하고 origin request 를 재요청
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // 새로운 토큰 발급 확인
        // console.log(accessToken, refreshToken);

        return axios(originalRequest);
      } catch (error) {
        // 만약 refreshToken 보내도 error 가 뜨면 login 화면으로 보내기 -> redirect
        // console.log('Error refreshing token:', error);

        //!login 이동
        // console.log('리프레시토큰도 에러났나');
        window.location.href = '/login'; // 로그인화면으로 보내기
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } else if (error?.response?.data?.status === 403) {
      // access token 자체를 안보낸 경우
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      //!login 이동
      window.location.href = '/login';
      // console.log('아니면 혹시 여기서? 여긴 403 에러');
    }

    return Promise.reject(error);
  },
);

export default instance;
