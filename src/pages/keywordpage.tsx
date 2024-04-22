import React from 'react';

interface KeywordPageProps {}

const KeywordPage: React.FC<KeywordPageProps> = ({}) => {
  const keywords: string[] = ['휴지', '두루마리', '...', '...', '...', '...'];

  const handleEdit = (keyword: string) => {
    console.log('키워드 수정:', keyword);
  };

  const handleDelete = (keyword: string) => {
    console.log('키워드 삭제:', keyword);
  };

  return (
    // Header.tsx 추가
    <div className="min-h-screen w-full h-full">
      <div className="max-w-screen-lg max-h-screen-lg mx-auto p-8">
        <div className="flex justify-center border-b-2 pb-4 mb-4">
          <h2 className="text-xl font-sans font-bold">키워드</h2>
        </div>
        <ul className="mb-6 mt-2">
          {keywords.map((keyword, index) => (
            <li key={index} className="flex justify-between items-center border-b py-10">
              <span>{keyword}</span>
              <div>
                <button className="bg-primary text-white py-2 px-8 rounded mr-2" onClick={() => handleEdit(keyword)}>
                  수정
                </button>
                <button className="bg-black text-white py-2 px-8 rounded" onClick={() => handleDelete(keyword)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* 검색창 구현하기  */}
        <div className="mt-auto">
          <input
            type="text"
            placeholder="알림을 받을 키워드를 입력하세요"
            className="border border-black rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
