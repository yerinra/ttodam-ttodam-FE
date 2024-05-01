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

export default function PostListPage() {
  useRequireLogin();
  const { selectedCategory } = useParams();
  // const { data, error, isLoading } = useQuery<PostPreview[]>({
  //   queryKey: ['posts', selectedCategory],
  //   queryFn: () => getCategoryPosts(selectedCategory as Category),
  //   enabled: !!selectedCategory,
  // });
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
        const apiUrl = selectedCategory === 'all' ? '/post/list' : `/post/category/${selectedCategory}`;
        const response = await axiosAccess({
          method: 'get',
          url: apiUrl,
        });
        setData(response.data);
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
    // const sorted = data;
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
        <div className="flex items-center justify-between">
          <div className="flex ml-4">
            <b className="font-extrabold text-primary">{searchKeyword}</b>에 대한{' '}
            <p className="ml-1 "> {data.length}</p> 개의 검색결과가 있습니다.
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchKeyword('');
              setView('listView');
            }}
          >
            <SymbolIcon />
          </Button>
        </div>
      )}
      {view === 'listView' && (
        <>
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
        </>
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
