import React from 'react';
import logo from '../assets/logo.png';

import SignUpForm from '../components/Signup/SignUpForm';
import SocialLogin from '../components/Login/SocialLogin';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen my-20">
      <img src={logo} alt="Logo" className="w-24 h-24 mb-8" />
      <h1 className="text-4xl font-bold mb-8">회원가입</h1>
      <SignUpForm />
      <SocialLogin />
    </div>
  );
};

export default SignUpPage;
