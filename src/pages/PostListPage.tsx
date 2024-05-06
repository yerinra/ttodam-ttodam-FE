/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Pencil2Icon, SymbolIcon } from '@radix-ui/react-icons';

import { PostPreview, type Category, type OptionType, type StatusFilter } from '@/types/post';

import PaginationSection from '../components/postListPage/PaginationSection';
import CategorySelector from '@/components/postListPage/CategorySelector';
import PostList from '@/components/postListPage/PostList';
import StatusFilterSection from '@/components/postListPage/StatusFilterSection';
import SortOptions from '@/components/postListPage/SortOptions';
import SearchForm from '@/components/atoms/SearchForm';

import usePagination from '@/hooks/usePagination';
import useRequireLogin from '@/hooks/useRequireLogin';
import { axiosAccessFn } from '@/apis/apiClient';
import { categoryNameKR } from '@/lib/utils';
import ListViewOptions from '@/components/postListPage/ListViewOptions';
import SearchViewHeader from '@/components/postListPage/SearchViewHeader';

export default function PostListPage() {
  useRequireLogin();
  const { selectedCategory } = useParams();

  const [view, setView] = useState<'listView' | 'searchView'>('listView');
  const axiosAccess = axiosAccessFn();
  const [data, setData] = useState<PostPreview[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('ALL');
  const [selectedSort, setSelectedSort] = useState<'createdAt' | 'title'>('createdAt');
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState(data);
  const [tempKeyword, setTempKeyword] = useState('');
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
        const apiUrl =
          selectedCategory === 'all'
            ? '/post/list'
            : `/post/category/${categoryNameKR(selectedCategory?.toUpperCase() as Exclude<Category, 'ALL'>)}`;
        const response = await axiosAccess({
          method: 'get',
          url: apiUrl,
        });
        setData(response.data || []);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    setStartPage(1);
    setCurrentPage(1);
    setSelectedFilter('ALL');
    if (view === 'listView') fetchData();
  }, [selectedCategory, view]);

  useEffect(() => {
    const sorted = data.filter(v => {
      if (selectedFilter == 'ALL') return v;
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
        if (x.createdAt > y.createdAt) return 1;
        else if (x.createdAt === y.createdAt) return 0;
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

    const trimmedKeyword = tempKeyword.trim();

    if (!trimmedKeyword || trimmedKeyword.length < 2) {
      // 입력 값이 공백 또는 두 글자 미만인 경우 경고 메시지 표시
      alert('최소 두 글자 이상 입력해주세요.');
      return;
    } else {
      try {
        // 검색어를 포함한 URL로 요청을 보냅니다.
        const response = await axiosAccess({
          method: 'get',
          url: 'post/search',
          params: {
            word: trimmedKeyword,
          },
        });

        // 요청 결과로 받은 데이터를 setData로 업데이트합니다.
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
