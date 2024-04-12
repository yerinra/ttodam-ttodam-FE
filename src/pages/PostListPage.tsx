import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import type { Post } from '../lib/types';

import PaginationSection from '../components/postListPage/PaginationSection';
import CategorySelector from '@/components/postListPage/CategorySelector';
import PostList from '@/components/postListPage/\bPostList';
import { DotFilledIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PostListPage() {
  const { selectedCategory } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Post[] | []>([]);

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
    fetchData();
  }, [selectedCategory]);

  // sort
  const SORT_OPTIONS = [
    { type: 'createAt', name: '최신순' },
    { type: 'title', name: '제목순' },
  ] as const;

  type optionType = (typeof SORT_OPTIONS)[number]['type'];
  const [sortOption, setSortOption] = useState<'createAt' | 'title'>('createAt');
  const handleSortOptionClick = (type: optionType) => {
    setSortOption(type);
  };
  const [sortedPosts, setSortedPosts] = useState(data);
  useEffect(() => {
    const sorted = [...data];
    if (sortOption === 'title') {
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
    setSortedPosts(sorted);
  }, [data, sortOption]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [startPage, setStartPage] = useState(1);
  const itemsPerPage = 2;
  const pagesToShow = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPageGroup = () => {
    if (startPage + pagesToShow <= totalPages) {
      setStartPage(startPage + pagesToShow);
    }
  };
  const handlePrevPageGroup = () => {
    if (startPage - pagesToShow >= 1) {
      setStartPage(startPage - pagesToShow);
    }
  };
  const handlePageClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { innerText } = e.target as HTMLLIElement;
    const newPage = Number(innerText);
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstItem, indexOfLastItem);

  // search
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchKeyword}`);
    setSearchKeyword('');
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <Input
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          className="mt-4 mb-6 placeholder:text-dark-gray"
          placeholder="상품의 이름이나 게시글 제목을 검색해보세요."
        />
      </form>
      <CategorySelector selectedCategory={selectedCategory} />
      <section className="flex items-center justify-center mt-2">
        <ul className="flex gap-2 text-sm my-2 mt-4">
          {SORT_OPTIONS.map(option => (
            <li key={option.type}>
              <button
                className={cn('flex items-center', {
                  'text-light-gray hover:text-dark-gray': option.type !== sortOption,
                })}
                onClick={() => handleSortOptionClick(option.type)}
              >
                <DotFilledIcon className={cn({ 'text-primary': option.type == sortOption })} />
                {option.name}
              </button>
            </li>
          ))}
        </ul>
        <Link to="/post/new" className="ml-auto">
          <Button className="gap-1 bg-slate-600 hover:bg-slate-500 transition-all">
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
