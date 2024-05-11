import React from 'react';
import logo from '../assets/logo.png';

import SignUpForm from '../components/signupPage/SignUpForm';
import SocialLogin from '../components/LoginPage/SocialLogin';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-4/5 ">
      <img src={logo} alt="Logo" className="w-20 h-20 mb-8" />
      <h1 className="text-3xl font-bold mb-8">회원가입</h1>
      <SignUpForm />
      <SocialLogin />
    </div>
  );
};

export default SignUpPage;
