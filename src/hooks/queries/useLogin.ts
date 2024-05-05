import { LoginFormData, login } from '@/apis/auth/login';
import { useCookies } from 'react-cookie';
import { QueryClient, useMutation } from '@tanstack/react-query';
import useUserIsLoggedInStore from '@/store/isLoginStore';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useUserIsLoggedInStore();
  const [, setCookie] = useCookies(['AccessToken']);

  return useMutation({
    mutationFn: (loginData: LoginFormData) => login(loginData),
    onSuccess: data => {
      const { accessToken } = data;
      queryClient.setQueryData(['accessToken'], accessToken);
      setCookie('AccessToken', accessToken, {
        path: '/',
      });
      alert('로그인 성공!');
      setIsLoggedIn(true);
      navigate('/home');
    },
    onError: err => {
      alert('로그인에 실패하였습니다.');
      console.error('로그인 api 실패', err);
      reset();
    },
  });
}
