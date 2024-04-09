import { CATEGORIES } from '../lib/data';
import { Link, useParams } from 'react-router-dom';
import type { category, postPreview } from '../lib/types';

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

export default function PostListPage() {
  const { selectedCategory } = useParams();

  const postData: postPreview[] = [
    {
      id: 1,
      title: '휴지 같이 사요',
      content: '휴지 같이 사실 분을 구합니다. 요청 주세요!',
      category: 'kitchen',
      product_name: ['휴지 10개입'],
      price: 10000,
      original_price: 20000,
      participants: 2,
      recruit_status: 'RECRUITING',
    },
    {
      id: 2,
      title: '칫솔 치약 같이 사실 분 모집',
      content: '칫솔, 치약 같이 사실 분을 구합니다.',
      category: 'life',
      product_name: ['칫솔 10개입', '치약 1개'],
      price: 20000,
      original_price: 30000,
      participants: 3,
      recruit_status: 'RECRUITED',
    },
  ];

  return (
    <>
      <section className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <Link
            key={category.type}
            to={`/posts/${category.type}`}
            className={cn('text-sm px-3 py-1 bg-secondary rounded-3xl', {
              'bg-primary text-white': category.type === selectedCategory,
            })}
          >
            {category.name}
          </Link>
        ))}
      </section>

      <main className="mt-5">
        <section>
          {postData
            .filter(post => {
              if (selectedCategory == 'all') return post;
              else {
                return selectedCategory == post.category;
              }
            })
            .map((post: postPreview) => (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2"
              >
                <div className="flex items-center gap-x-2">
                  <p
                    className={cn(
                      'border px-1 py-[1px] rounded-full text-sm',
                      {
                        'border-primary text-primary': post.recruit_status === 'RECRUITING',
                      },
                      { 'border-light-gray bg-light-gray text-white': post.recruit_status === 'RECRUITED' },
                    )}
                  >
                    {post.recruit_status === 'RECRUITING' ? '모집중' : '모집완료'}
                  </p>
                  <h2 className="font-bold">{post.title}</h2>
                </div>
                <p className="text-sm">{post.content}</p>
                <div className="flex flex-col">
                  <p className="line-through text-dark-gray -mb-1">{post.original_price.toLocaleString()}</p>
                  <div className="flex gap-1">
                    <p>{post.price.toLocaleString()}</p>
                    <p className="text-destructive font-semibold">
                      {100 - Math.floor((+post.price / +post.original_price) * 100)}%
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </section>
        <section className="mt-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
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
