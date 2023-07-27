import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const USERID = '07161c43-bc03-44f6-95c1-a56d440a23bf';
// axios.defaults.withCredentials = true;

// 사용자 정의 구성을 사용하는 axios 인스턴스 생성
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    userId: USERID,
    // Authorization: `Bearer`, 토큰
  },
});

// 요청 인터셉터 추가
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
