import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
// import registerKeyword from '@/apis/keyword/registerKeyword';
// import updateKeyword from '@/apis/keyword/updateKeyword';
// import deleteKeyword from '@/apis/keyword/deleteKeyword';

interface Keyword {
  keywordId: string;
  userId: string;
  keywordName: string;
}

const KeywordPage: React.FC = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string>('');

  useEffect(() => {
    const dummyKeywords: Keyword[] = [
      { keywordId: '1', userId: '1', keywordName: '휴지' },
      { keywordId: '2', userId: '1', keywordName: '물' },
    ];
    setKeywords(dummyKeywords);
  }, []);

  const handleEdit = (keywordId: string, newKeywordName: string) => {
    console.log('키워드 수정:', keywordId, newKeywordName);
    setKeywords(prevKeywords =>
      prevKeywords.map(keyword =>
        keyword.keywordId === keywordId ? { ...keyword, keywordName: newKeywordName } : keyword,
      ),
    );
  };

  const handleDelete = (keywordId: string) => {
    console.log('키워드 삭제:', keywordId);
    setKeywords(prevKeywords => prevKeywords.filter(keyword => keyword.keywordId !== keywordId));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(event.target.value);
  };

  const handleAddKeyword = () => {
    if (inputKeyword.trim() !== '') {
      const newKeyword: Keyword = {
        keywordId: (keywords.length + 1).toString(),
        userId: '1',
        keywordName: inputKeyword.trim(),
      };
      setKeywords(prevKeywords => [...prevKeywords, newKeyword]);
      setInputKeyword('');
    }
  };

  return (
    <div className="min-h-screen w-full h-full">
      <Header />
      <div className="max-w-screen-lg max-h-screen-lg mx-auto p-20 mt-20">
        <div className="flex justify-center border-b-2 pb-4 mb-4">
          <h2 className="text-xl font-sans font-bold">키워드</h2>
        </div>
        <ul className="mb-6 mt-2">
          {keywords.map(keyword => (
            <li key={keyword.keywordId} className="flex justify-between items-center border-b py-10 hover:bg-gray-100">
              <span>{keyword.keywordName}</span>
              <div>
                <button
                  className="bg-primary text-white py-2 px-8 rounded mr-2"
                  onClick={() => {
                    const newKeywordName = prompt('새로운 키워드를 입력하세요:', keyword.keywordName);
                    if (newKeywordName !== null) {
                      handleEdit(keyword.keywordId, newKeywordName);
                    }
                  }}
                >
                  수정
                </button>
                <button
                  className="bg-black text-white py-2 px-8 rounded"
                  onClick={() => handleDelete(keyword.keywordId)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <input
            type="text"
            placeholder="알림을 받을 키워드를 입력하세요"
            className="border border-black rounded-md px-3 py-2 w-full"
            value={inputKeyword}
            onChange={handleInputChange}
          />
          <button className="bg-primary text-white px-4 py-2 rounded mt-2" onClick={handleAddKeyword}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
