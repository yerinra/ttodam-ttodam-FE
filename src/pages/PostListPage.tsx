import { CATEGORIES } from '../lib/data';
import { useNavigate, useParams } from 'react-router-dom';
import type { category, postPreview } from '../lib/types';

import { cn } from '../lib/utils';

export default function PostListPage() {
  const { selectedCategory } = useParams();
  const navigate = useNavigate();

  const handleCategoryChange = (newCategory: category) => {
    navigate(`/post/${newCategory}`);
  };

  const postData: postPreview[] = [
    {
      id: 1,
      title: '휴지 같이 사요',
      content: '휴지 같이 사실 분을 구합니다. 요청 주세요!',
      category: 'life',
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
          <button
            key={category.type}
            onClick={() => handleCategoryChange(category.type)}
            className={cn('text-sm px-3 py-1 bg-secondary rounded-3xl', {
              'bg-primary text-white': category.type === selectedCategory,
            })}
          >
            {category.name}
          </button>
        ))}
      </section>
      <main className="mt-5">
        <section>
          {postData.map((post: postPreview) => (
            <div
              key={post.id}
              className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary cursor-pointer gap-y-2"
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
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
