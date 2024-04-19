import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';

import { type Category, type OptionType, type Post, type StatusFilter } from '../lib/types';

import PaginationSection from '../components/postListPage/PaginationSection';
import CategorySelector from '@/components/postListPage/CategorySelector';
import PostList from '@/components/postListPage/PostList';
import StatusFilterSection from '@/components/postListPage/StatusFilterSection';
import SortOptions from '@/components/postListPage/SortOptions';
import SearchForm from '@/components/atoms/SearchForm';

import usePagination from '@/hooks/usePagination';


export default function PostListPage() {
  const { selectedCategory } = useParams();

  const [data, setData] = useState<Post[] | []>([]);
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');
  const [selectedSort, setSelectedSort] = useState<'createAt' | 'title'>('createAt');
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState(data);
  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    startPage,
    setStartPage,
    currentPage,
    setCurrentPage,
    indexOfFirstItem,
    indexOfLastItem,
    handleNextPageGroup,
    handlePrevPageGroup,
    handlePageClick,
    totalPages,
    pagesToShow,
  } = usePagination(filteredAndSortedPosts.length);

  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = selectedCategory === 'all' ? '/post' : `/post/${selectedCategory}`;
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    setStartPage(1);
    setCurrentPage(1);
    setSelectedFilter('all');
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const sorted = [...data].filter(v => {
      if (selectedFilter == 'all') return v;
      else return v.status == selectedFilter;
    });
    if (selectedSort === 'title') {
      sorted.sort((x, y) => {
        if (x.title > y.title) return 1;
        else if (x.title === y.title) return 0;
        else return -1;
      });
    } else {
      sorted.sort((x, y) => {
        if (x.createAt > y.createAt) return 1;
        else if (x.createAt === y.createAt) return 0;
        else return -1;
      });
    }
    setFilteredAndSortedPosts(sorted);
    setCurrentPage(1);
    setStartPage(1);
  }, [data, selectedSort, selectedFilter]);

  // sort
  const handleSortOptionClick = (type: OptionType) => {
    setSelectedSort(type);
  };

  // search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedKeyword = searchKeyword.trim();
    if (!trimmedKeyword) return;
    // 입력 값이 공백 또는 비어 있는 경우 경고 메시지 표시
    if (trimmedKeyword === '' || trimmedKeyword.length < 2) {
      alert('최소 두 글자 이상 입력해주세요.');
      setSearchKeyword('');
    } else {
      try {
        // 검색어를 포함한 URL로 요청을 보냅니다.
        const response = await axios.get(`/post/search?keyword=${trimmedKeyword}`);

        // 요청 결과로 받은 데이터를 setData로 업데이트합니다.
        setData(response.data);
      } catch (error) {
        console.error('Error fetching search data: ', error);
      } finally {
        setSearchKeyword('');
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value);

  return (
    <>
      <SearchForm
        onFormSubmit={handleSearch}
        value={searchKeyword}
        onValueChange={handleChange}
        placeholder="상품의 이름이나 게시글 제목을 검색해보세요."
        className="mt-4 mb-6 placeholder:text-dark-gray"
      />
      <CategorySelector selectedCategory={selectedCategory as Category} />

      <section className="flex items-center justify-center mt-2 pt-2">
        <div className="flex flex-col gap-y-1">
          <StatusFilterSection selectedFilter={selectedFilter} handleFilterSelect={setSelectedFilter} />
          <SortOptions selectedSort={selectedSort} handleSortOptionClick={handleSortOptionClick} />
        </div>

        <Link to="/post/new" className="ml-auto">
          <Button className="gap-1 bg-slate-700 hover:bg-slate-600 transition-all">
            <Pencil2Icon />
            <p className="hidden md:inline">글쓰기</p>
          </Button>
        </Link>
      </section>

      <main className="mt-5">
        <PostList currentPosts={currentPosts} />
        <PaginationSection
          currentPage={currentPage}
          startPage={startPage}
          pagesToShow={pagesToShow}
          totalPages={totalPages}
          handleNextPageGroup={handleNextPageGroup}
          handlePrevPageGroup={handlePrevPageGroup}
          handlePageClick={handlePageClick}
        />
      </main>
    </>
  );
}
