import React from 'react';
import { useForm } from 'react-hook-form';

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
      <img src="/src/assets/logo.png" alt="Logo" className="w-40 h-40 mb-8" />
      <h1 className="text-3xl font-bold mb-8">로그인</h1>

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
          className={`border-b border-gray-500 focus:outline-none w-[320px] py-2 mb-4 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        {!errors.email && <span className="invisible h-5 text-transparent">Placeholder</span>}

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
          className={`border-b border-gray-500 focus:outline-none w-[320px] py-2 mb-6 ${
            errors.password ? 'border-red-500' : ''
          }`}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        {!errors.password && <span className="invisible h-5 text-transparent">Placeholder</span>}

        <div className="flex justify-between w-[320px] mb-6">
          <a href="/" className="text-sm text-gray-500">
            비밀번호 찾기
          </a>
          <a href="/signup" className="text-sm text-gray-500">
            회원가입
          </a>
        </div>

        <button type="submit" className="bg-primary text-white px-6 py-2 rounded w-[320px] mb-2">
          로그인
        </button>
      </form>

      <div className="flex flex-col space-y-2">
        <button className="bg-yellow text-black px-6 py-2 rounded w-[320px]">카카오톡 로그인</button>
        <button className="bg-white border-black text-black border border-solid px-6 py-2 rounded w-[320px]">
          구글 로그인
        </button>
      </div>
    </div>
  );
}
