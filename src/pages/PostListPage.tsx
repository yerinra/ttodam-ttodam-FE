import { CATEGORIES } from '../lib/data';
import { useNavigate, useParams } from 'react-router-dom';
import type { category } from '../lib/types';

export default function PostListPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const handleCategoryChange = (newCategory: category) => {
    navigate(`/post/${newCategory}`);
  };

  return (
    <>
      <section className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category.type}
            onClick={() => handleCategoryChange(category.type)}
            className={`text-sm px-3 py-1 bg-slate-100 rounded-3xl ${
              category.type === categoryName && 'bg-primary text-white'
            } ${!categoryName && category.type === 'all' && 'bg-primary text-white'}`}
          >
            {category.name}
          </button>
        ))}
      </section>
      <main className="mt-20">{categoryName}에 대한 글</main>
    </>
  );
}
