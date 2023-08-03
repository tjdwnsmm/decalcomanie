import { RESTAPI_KEY } from '../../api/apikey';

const CLIENT_ID = RESTAPI_KEY;
const REDIRECT_URI = 'http://localhost:5173/oauth/kakao/callback';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
