import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { googleLogin, kakaoLogin } from '@/apis/auth/socialLogin';
import useUserIsLoggedInStore from '@/store/isLoginStore';

export default function LoginLoadingPage() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const [, setCookie] = useCookies(['AccessToken']);
  const { setIsLoggedIn } = useUserIsLoggedInStore();

  useEffect(() => {
    if (domain !== 'google' && domain !== 'kakao') {
      navigate('/login');
      return;
    }

    const handleLogin = async () => {
      let res;

      try {
        if (domain === 'kakao') {
          res = await kakaoLogin(code as string);
        } else if (domain === 'google') {
          res = await googleLogin(code as string);
        }

        setCookie('AccessToken', res.accessToken);
        setIsLoggedIn(true);
        alert('로그인 성공!');
        navigate('/home');
      } catch (err) {
        console.error(err);
      }
    };

    if (domain === 'kakao' || domain === 'google') {
      handleLogin();
    }
  }, [domain, code, navigate, setCookie, setIsLoggedIn]);

  return <div>로그인 진행중입니다. 잠시만 기다려주세요...</div>;
}
