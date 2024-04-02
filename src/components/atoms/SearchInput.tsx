import React, { useState } from 'react';

// 데이터 들어오면 검색 기능 구현 (그전에 더미데이터 어떻게 할지 의논)
export default function SearchInput() {
  const [search, setSearch] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={search}
      placeholder="검색어를 입력하세요."
      onChange={handleChange}
      className="min-w-[240px] w-full max-w-[768px] h-11 border border-black rounded hover:border-primary focus:border-primary px-3 py-1 focus:outline-none text-sm"
    />
  );
}
