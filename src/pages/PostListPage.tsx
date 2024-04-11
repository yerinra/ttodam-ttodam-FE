import { CATEGORIES } from '../lib/data';
import { Link, useParams } from 'react-router-dom';
import type { post, category } from '../lib/types';

import { cn } from '../lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostListPage() {
  const { selectedCategory } = useParams();

  const [data, setData] = useState<post[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = selectedCategory === 'all' ? '/post' : `/post/${selectedCategory}`;

        const response = await axios.get(apiUrl);

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <section className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <Link
            key={category.type}
            to={`/posts/${category.type.toLowerCase()}`}
            className={cn('text-sm px-3 py-1 bg-secondary rounded-3xl', {
              'bg-primary text-white': category.type.toLowerCase() === selectedCategory,
            })}
          >
            {category.name}
          </Link>
        ))}
      </section>

      <main className="mt-5">
        <section>
          {data &&
            data.map((post: post) => (
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
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </>
  );
}
