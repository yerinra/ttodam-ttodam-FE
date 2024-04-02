import React from 'react';
import { IoBookmarkSharp } from 'react-icons/io5';

// 지도영역 카카오 API 불러오기
// 상품 이름, 주소, 모집인원 데이터에 맞춰서 불러오기
export default function HomePage() {
  return (
    <div className="pt-40 w-full h-screen bg-gray-500">
      <p>지도영역</p>
      <div className="absolute bottom-[60px] left-[50%] translate-x-[-50%] flex flex-col gap-2 w-11/12 px-7 py-4 border border-black rounded-2xl bg-white">
        <strong>상품 이름</strong>
        <p className="text-sm">서울특별시 강남구 테헤란로 7길 21</p>
        <p className="text-sm">
          모집 인원
          <span className="text-sm ml-1">1</span>
          <span className="text-sm">/</span>
          <span className="text-sm font-bold">3</span>
        </p>
        <IoBookmarkSharp className="absolute top-[-4px] right-[20px] w-8 h-9 text-yellow-300" />
      </div>
    </div>
  );
}
