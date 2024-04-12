import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';

import type { OptionType, Post, StatusFilter } from '../lib/types';

import PaginationSection from '../components/postListPage/PaginationSection';
import CategorySelector from '@/components/postListPage/CategorySelector';
import PostList from '@/components/postListPage/PostList';
import StatusFilterSection from '@/components/postListPage/StatusFilterSection';
import SortOptions from '@/components/postListPage/SortOptions';

export default function PostListPage() {
  const { selectedCategory } = useParams();

  const [data, setData] = useState<Post[] | []>([]);
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');
  const [selectedSort, setSelectedSort] = useState<'createAt' | 'title'>('createAt');
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState(data);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const itemsPerPage = 2;
  const pagesToShow = 5;
  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
  }, [data, selectedSort, selectedFilter]);

  // sort
  const handleSortOptionClick = (type: OptionType) => {
    setSelectedSort(type);
  };

  // pagination
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

  return (
    <>
      <CategorySelector selectedCategory={selectedCategory} />

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
