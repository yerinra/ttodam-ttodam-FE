import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import type { post } from '../lib/types';
import { cn } from '../lib/utils';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import CategorySelector from '@/components/postListPage/CategorySelector';

export default function PostListPage() {
  const { selectedCategory } = useParams();

  const [data, setData] = useState<post[] | []>([]);

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
    setCurrentPage(+innerText);
  };

  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const endPage = startPage + pagesToShow - 1;
  const pages = Array.from({ length: Math.min(pagesToShow, totalPages - startPage + 1) }, (_, i) => startPage + i);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map(page => (
    <PaginationItem key={page} onClick={handlePageClick} className={cn({ 'text-primary/90': currentPage == page })}>
      <PaginationLink className="cursor-pointer">{page}</PaginationLink>
    </PaginationItem>
  ));

  return (
    <>
      <CategorySelector selectedCategory={selectedCategory} />
      <main className="mt-5">
        <section>
          {currentItems &&
            currentItems.map((post: post) => (
              <Link
                to={`/post/${post.Id}`}
                key={post.Id}
                className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2"
              >
                <div className="flex items-center gap-x-2">
                  <p
                    className={cn(
                      'border px-1 py-[1px] rounded-full text-sm',
                      {
                        'border-primary text-primary': post.status === 'in_progress',
                      },
                      { 'border-light-gray bg-light-gray text-white': post.status === 'completed' },
                      { 'border-destructive text-destructive': post.status === 'failed' },
                    )}
                  >
                    {post.status === 'in_progress' && '모집중'}
                    {post.status === 'completed' && '모집완료'}
                    {post.status === 'failed' && '모집실패'}
                  </p>
                  <h2 className="font-bold">{post.title}</h2>
                </div>
                <p className="text-sm">{post.content}</p>
                {/* <div className="flex flex-col">
                    <p className="line-through text-dark-gray -mb-1">{post.price.toLocaleString()}</p>
                    <div className="flex gap-1">
                      <p>{post.price.toLocaleString()}</p>
                      <p className="text-destructive font-semibold">
                        {100 - Math.floor((+post.price / +post.original_price) * 100)}%
                      </p>
                    </div>
                  </div> */}
              </Link>
            ))}
        </section>

        <section className="mt-2 mb-[63px]">
          <Pagination>
            <PaginationContent>
              <button onClick={handlePrevPageGroup} disabled={startPage === 1} className="disabled:text-light-gray">
                <ChevronLeftIcon />
              </button>
              {renderPageNumbers}
              <button
                onClick={handleNextPageGroup}
                disabled={endPage >= totalPages}
                className="disabled:text-light-gray"
              >
                <ChevronRightIcon />
              </button>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </>
  );
}
