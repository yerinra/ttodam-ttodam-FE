import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/src/assets/logo.png" alt="Logo" className="w-40 h-40 mb-10" />

      <h1 className="text-5xl font-sans mb-12">로그인</h1>

      <input
        type="email"
        placeholder="이메일을 입력하세요"
        className="border-b border-gray-500 focus:outline-none w-[500px] py-2 mb-4"
      />

      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="border-b border-gray-500 focus:outline-none w-[500px] py-2 mb-6"
      />

      <div className="flex justify-between w-[500px] mb-6">
        <Link to="/" className="text-sm text-gray-500">
          비밀번호 찾기
        </Link>
        <Link to="/signup" className="text-sm text-gray-500">
          회원가입
        </Link>
      </div>

      <button className="bg-primary  text-white px-6 py-3 rounded w-[500px] mb-2">로그인</button>

      <div className="flex flex-col space-y-2">
        <button className="bg-yellow text-black px-6 py-3 rounded w-[500px]">카카오톡 로그인</button>
        <button className="bg-white border-black text-black border border-solid px-6 py-3 rounded w-[500px]">
          구글 로그인
        </button>
      </div>
    </div>
  );
}
//  로그인 ui수정
