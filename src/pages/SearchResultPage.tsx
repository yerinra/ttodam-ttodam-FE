import SearchForm from '@/components/atoms/SearchForm';
import { Post } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<Post[] | []>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `/post/search?keyword=${searchKeyword}`;
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // setStartPage(1);
    // setCurrentPage(1);
    // setSelectedFilter('all');
    fetchData();
  }, [searchKeyword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();

    // 입력 값이 공백 또는 비어 있는 경우 경고 메시지 표시
    if (trimmedKeyword === '' || trimmedKeyword.length < 2) {
      alert('최소 두 글자 이상 입력해주세요.');
      setKeyword('');
    } else {
      navigate(`/search?keyword=${trimmedKeyword}`);
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
      <p>{searchKeyword} 에 대한 검색 결과.</p>
      <div>{data && data.map(d => d.title)}</div>
    </section>
  );
}
