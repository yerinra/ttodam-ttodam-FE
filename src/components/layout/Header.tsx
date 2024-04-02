import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  // 헤더 280px 기준으로 min-width padding 양쪽 20px씩 빼고 240px로 설정
  return (
    <header className="fixed flex w-full min-h-[50px] h-[136px] items-center flex-col px-5 py-4 gap-4 border min-w-[240px]">
      <div className="flex w-full min-h-[50px] h-[96px] justify-between items-center">
        <h1 className="w-16 h-16">
          <Link to="/">
            <img src={logo} alt="또담또담" />
          </Link>
        </h1>
        <Link
          to="/login"
          className="flex justify-center items-center bg-primary w-16 h-7 py-1.5 px-2 text-white rounded-md"
        >
          로그인
        </Link>
      </div>
      <input
        type="text"
        className="min-w-[240px] w-full max-w-[768px] h-11 border border-black rounded hover:border-primary focus:border-primary px-3 py-1 focus:outline-none text-sm"
      />
    </header>
  );
}
