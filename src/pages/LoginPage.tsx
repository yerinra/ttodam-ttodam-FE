import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../components/Login/SocialLogin';
import { Link } from 'react-router-dom'

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link to="/">
      <img src="/src/assets/logo.png" alt="Logo" className="w-48 h-48 mb-8" />
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
          <a href="/" className="text-sm text-gray-500">
            비밀번호 찾기
          </a>
          <Link to="/sign">
          <a className="text-sm text-gray-500">
            회원가입
          </a>
          </Link>
        </div>

        <button type="submit" className="bg-primary text-white px-10 py-4 rounded w-96 mb-3">
          로그인
        </button>
      </form>
      <SocialLogin />
    </div>
  );
}
