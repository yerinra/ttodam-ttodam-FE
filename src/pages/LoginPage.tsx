import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
// import { loginUser } from '@/apis/auth/login';
import { LoginFormData, login } from '@/apis/auth/login';
import SocialLogin from '@/components/Login/SocialLogin';
import { useCookies } from 'react-cookie';
import useUserIsLogInStore from '../store/isLoginStore';
import { QueryClient, useMutation } from '@tanstack/react-query';

import useRemainCookie from '@/hooks/useRemainCookie';

// const cookies = new Cookies();

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [, setCookie, removeCookie] = useCookies(['AccessToken']);

  const queryClient = new QueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { isLoggedIn, setIsLoggedIn } = useUserIsLogInStore();

  useEffect(() => {
    if (isLoggedIn) navigate('/home');
  }, []);

  const loginMutation = useMutation({
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
  const onSubmit = async (data: FormValues) => {
    // try {
    //   const token = await loginUser(data);
    //   if (token) {
    //     cookies.set('accessToken', token, { path: '/' });
    //     setIsLoggedIn(true);
    //     navigate('/home');
    //   } else {
    //     alert('로그인 실패. 계정 정보를 확인하세요.');
    //   }
    // } catch (error) {
    //   console.error('로그인 실패:', error);
    //   alert('로그인에 실패하였습니다.');
    // }
    try {
      loginMutation.mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        <>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 h-24 mb-8" />
          </Link>
          <h1 className="text-4xl font-bold mb-8">로그인</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
              className={`border-b border-gray-500 focus:outline-none w-96 py-4 mb-6 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
              className={`border-b border-gray-500 focus:outline-none w-96 py-4 mb-6 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && <span className="text-red-500 text-sm mb-4">{errors.password.message}</span>}

            <div className="flex justify-between w-96 mb-6">
              <Link to="/signup" className="text-sm text-gray-500">
                회원가입
              </Link>
            </div>

            <button type="submit" className="bg-primary text-white px-10 py-4 rounded w-96 mb-3">
              로그인
            </button>
          </form>
        </>
      }
      <SocialLogin />
    </div>
  );
};

export default LoginPage;
