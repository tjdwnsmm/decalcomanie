const CLIENT_ID = import.meta.env.VITE_REACT_APP_APIKEY;
const CLIENT_URL = import.meta.env.VITE_REACT_APP_HOST;

const REDIRECT_URI = `${CLIENT_URL}/oauth/kakao/callback`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
