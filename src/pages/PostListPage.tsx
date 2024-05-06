/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosAccessFn } from '@/apis/apiClient';

import type { PostPreview, Category, OptionType, StatusFilter } from '@/types/post';
import usePagination from '@/hooks/usePagination';
import useRequireLogin from '@/hooks/useRequireLogin';
import usePostData from '@/hooks/usePostData';

import PaginationSection from '../components/postListPage/PaginationSection';
import PostList from '@/components/postListPage/PostList';
import SearchForm from '@/components/atoms/SearchForm';
import ListViewOptions from '@/components/postListPage/ListViewOptions';
import SearchViewHeader from '@/components/postListPage/SearchViewHeader';

export default function PostListPage() {
  useRequireLogin();
  const { selectedCategory } = useParams();

  const [view, setView] = useState<'listView' | 'searchView'>('listView');
  const axiosAccess = axiosAccessFn();

  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('ALL');
  const [selectedSort, setSelectedSort] = useState<'createdAt' | 'title'>('createdAt');

  const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState<PostPreview[]>([]);

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

  const [tempKeyword, setTempKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstItem, indexOfLastItem);

  const { data, setData } = usePostData({
    view,
    selectedCategory: selectedCategory || 'all',
    selectedFilter,
    setSelectedFilter,
    setStartPage,
    setCurrentPage,
    selectedSort,
    setFilteredAndSortedPosts,
  });

  // sort
  const handleSortOptionClick = (type: OptionType) => {
    setSelectedSort(type);
  };

  // search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedKeyword = tempKeyword.trim();

    if (!trimmedKeyword || trimmedKeyword.length < 2) {
      // 입력 값이 공백 또는 두 글자 미만인 경우 경고 메시지 표시
      alert('최소 두 글자 이상 입력해주세요.');
      return;
    } else {
      try {
        const response = await axiosAccess({
          method: 'get',
          url: 'post/search',
          params: {
            word: trimmedKeyword,
          },
        });

        setView('searchView');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching search data: ', error);
      } finally {
        setTempKeyword('');
        setSearchKeyword(trimmedKeyword);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTempKeyword(e.target.value);

  return (
    <>
      <SearchForm
        onFormSubmit={e => {
          setSearchKeyword(tempKeyword);
          handleSearch(e);
        }}
        value={tempKeyword}
        onValueChange={handleChange}
        placeholder="상품의 이름이나 게시글 제목을 검색해보세요."
        className="mt-4 mb-6 placeholder:text-dark-gray"
      />
      {view === 'searchView' && (
        <SearchViewHeader
          searchKeyword={searchKeyword}
          onClick={() => {
            setSearchKeyword('');
            setView('listView');
          }}
          searchResultCount={data.length}
        />
      )}
      {view === 'listView' && (
        <ListViewOptions
          selectedFilter={selectedFilter}
          selectedCategory={selectedCategory as Category}
          selectedSort={selectedSort}
          setSelectedFilter={setSelectedFilter}
          handleSortOptionClick={handleSortOptionClick}
        />
      )}

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
