/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '@/components/LoginPage/SocialLogin';
import useUserIsLogInStore from '../store/isLoginStore';

import Logo from '@/components/LoginPage/Logo';
import LoginForm from '@/components/LoginPage/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useUserIsLogInStore();

  useEffect(() => {
    if (isLoggedIn) navigate('/home');
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col items-center justify-center h-screen my-5">
      <Logo />
      <h1 className="text-4xl font-bold mb-8">로그인</h1>
      <LoginForm />
      <SocialLogin />
    </div>
  );
};

export default LoginPage;
