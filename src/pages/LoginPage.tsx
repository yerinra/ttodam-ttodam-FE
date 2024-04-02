import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[375px] bg-white rounded-lg p-8 border-solid border-2 border-black">
          <div className="flex flex-col items-center mb-10 mt-5">
            <img src="/src/assets/logo.png" alt="Logo" className="w-20 h-20 mt-12 mb-8" />
            <h1 className="text-3xl font-bold">로그인</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <form className="mb-3">
              <div className="mb-10">
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="border-b border-gray-500 focus:outline-none w-[268px]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="border-b border-gray-500 focus:outline-none w-[268px]"
                />
              </div>
              <div className="flex justify-between">
                <Link to="#" className="text-sm text-gray-500">
                  비밀번호 찾기
                </Link>
                <Link to="#" className="text-sm text-gray-500">
                  회원가입
                </Link>
              </div>
            </form>
            <div className="flex flex-col space-y-2">
              <button type="submit" className="bg-primary text-white px-4 py-1 rounded w-[268px] h-9">
                로그인
              </button>
              <button className="bg-second text-black px-4 py-1 rounded w-[268px] h-9">카카오톡 로그인</button>
              <button className="bg-primary  border-solid border-black text-black px-4 py-1 rounded w-[268px] h-9">
                구글 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
