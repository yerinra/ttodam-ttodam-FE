import { CATEGORIES } from '../lib/data';
import { useNavigate, useParams } from 'react-router-dom';
import type { category, postPreview } from '../lib/types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '../lib/utils';

export default function PostListPage() {
  const { selectedCategory } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleCategoryChange = (newCategory: category) => {
    navigate(`/post/${newCategory}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          selectedCategory === 'all'
            ? 'http://localhost:3001/post'
            : `http://localhost:3001/post?category=${selectedCategory}`,
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <section className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category.type}
            onClick={() => handleCategoryChange(category.type)}
            className={cn('text-sm px-3 py-1 bg-slate-100 rounded-3xl', {
              'bg-primary text-white': category.type === selectedCategory,
            })}
          >
            {category.name}
          </button>
        ))}
      </section>
      <main className="mt-5">
        <div className="lg:text-red-500">{'xxd'}</div>
        <section>
          {posts.map((post: postPreview) => (
            <div key={post.id} className="flex flex-col first-of-type:border-t-[1px] border-b-[1px] p-2">
              <div className="flex items-center gap-x-2">
                <p
                  className={cn(
                    'border px-1 py-[1px] rounded-full text-sm',
                    {
                      'border-primary text-primary': post.recruit_status === 'RECRUITING',
                    },
                    { 'border-light-gray text-light-gray': post.recruit_status === 'RECRUITED' },
                  )}
                >
                  {post.recruit_status === 'RECRUITING' ? '모집중' : '모집완료'}
                </p>
                <h2 className="font-semibold">{post.title}</h2>
              </div>
              <div className="flex flex-col">
                <p className="line-through text-dark-gray">{post.original_price}</p>
                <div className="flex gap-1">
                  <p>{post.price}</p>
                  <p className="text-red font-semibold">
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
