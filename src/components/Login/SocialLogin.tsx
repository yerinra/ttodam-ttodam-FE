import React from 'react';

export default function SocialLogin() {
  // -카카오 구글 구현 함수-

  return (
    <div className="flex flex-col space-y-4">
      <button className="bg-yellow text-black px-10 py-4 rounded w-96">카카오톡 로그인</button>
      <button className="bg-white border-black text-black border border-solid px-10 py-4 rounded w-96">
        구글 로그인
      </button>
    </div>
  );
}
