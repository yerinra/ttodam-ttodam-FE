import React from 'react';

export default function NavBar() {
  return (
    <nav className="w-full h-[55px] fixed max-w-[940px] bottom-0 bg-light-gray">
      <ul className="flex justify-between items-center w-full h-full px-5">
        <li>홈</li>
        <li>카테고리</li>
        <li>채팅</li>
        <li>알림</li>
        <li>마이페이지</li>
      </ul>
    </nav>
  );
}
