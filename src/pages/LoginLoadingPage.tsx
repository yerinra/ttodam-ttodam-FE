/* eslint-disable react-hooks/exhaustive-deps */
import { googleLogin, kakaoLogin } from '@/apis/auth/socialLogin';
import useUserIsLoggedInStore from '@/store/isLoginStore';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

export default function LoginLoadingPage() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const [, setCookie] = useCookies(['AccessToken']);
  const { setIsLoggedIn } = useUserIsLoggedInStore();

  useEffect(() => {
    if (domain !== 'google' && domain !== 'kakao') {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const res = await kakaoLogin(code as string);
        setCookie('AccessToken', res.accessToken);
        setIsLoggedIn(true);
        alert('성공!');
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const res = await googleLogin(code as string);
        setCookie('AccessToken', res.accessToken);
        setIsLoggedIn(true);
        alert('성공!');
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };

    if (domain == 'kakao') handleKakaoLogin();
    else if (domain == 'google') handleGoogleLogin();
  }, []);

  return <div>로그인 진행중입니다. 잠시만 기다려주세요...</div>;
}
