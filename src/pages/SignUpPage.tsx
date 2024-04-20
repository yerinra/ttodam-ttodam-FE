import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/Signup/SignUpForm";
import SocialLogin from "../components/Login/SocialLogin";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/src/assets/logo.png" alt="Logo" className="w-48 h-48 mb-8" />
      <h1 className="text-4xl font-bold mb-8">회원가입</h1>
      <SignUpForm />
      <SocialLogin />
    </div>
  );
};

export default SignUpPage;
