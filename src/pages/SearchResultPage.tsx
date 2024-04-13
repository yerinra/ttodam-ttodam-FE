import SearchForm from '@/components/atoms/SearchForm';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchResultPage() {
  const { searchKeyword } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();

    // 입력 값이 공백 또는 비어 있는 경우 경고 메시지 표시
    if (trimmedKeyword === '' || trimmedKeyword.length < 2) {
      alert('최소 두 글자 이상 입력해주세요.');
      setKeyword('');
    } else {
      navigate(`/search/${trimmedKeyword}`);
      setKeyword('');
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <section>
      <SearchForm
        onFormSubmit={handleSubmit}
        value={keyword as string}
        onValueChange={handleKeywordChange}
        className="mt-4 mb-6 placeholder:text-dark-gray"
      />
      {searchKeyword} 에 대한 검색 결과.
    </section>
  );
}
