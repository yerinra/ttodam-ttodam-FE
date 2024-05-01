const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5174' : 'https://ttodam-ttodam-fr.vercel.app';

const KAKAO_LOGIN_KEY = import.meta.env.VITE_KAKAO_LOGIN_API_KEY;
export const KAKAO_REDIRECT_URI = API_BASE_URL + import.meta.env.VITE_KAKAO_LOGIN_REDIRECT;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_LOGIN_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const GOOGLE_LOGIN_KEY = import.meta.env.VITE_GOOGLE_LOGIN_API_KEY;
export const GOOGLE_REDIRECT_URI = API_BASE_URL + import.meta.env.VITE_GOOGLE_LOGIN_REDIRECT;

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?
client_id=${GOOGLE_LOGIN_KEY}
&redirect_uri=${GOOGLE_REDIRECT_URI}
&response_type=code
&scope=https://www.googleapis.com/auth/indexing`;
