import { Link } from 'react-router-dom';

import type { Post } from '@/lib/types';
import { cn } from '@/lib/utils';

type PostListProps = {
  currentPosts: Post[];
};

export default function PostList({ currentPosts }: PostListProps) {
  return (
    <section>
      {currentPosts &&
        currentPosts.map((post: Post) => (
          <Link
            to={`/post/${post.Id}`}
            key={post.Id}
            className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
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
            <div className="flex">
              <ul className="flex gap-2 text-sm items-center opacity-50">
                {post.products.map(product => (
                  <li className="px-[6px] py-[2px]  bg-slate-200 rounded-sm" key={product.productId}>
                    {`${product.productName} ${(product.price / product.count).toLocaleString()}원`}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      {(!currentPosts || currentPosts.length == 0) && (
        <p className="flex justify-center items-center py-10">해당하는 글이 없습니다.</p>
      )}
    </section>
  );
}
