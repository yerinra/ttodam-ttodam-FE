import { Category } from '@/types/post';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/constants/data';

type CategorySelectorProps = {
  selectedCategory: Category;
};

export default function CategorySelector({ selectedCategory }: CategorySelectorProps) {
  return (
    <nav>
      <ul className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <li key={category.type}>
            <Link
              to={`/posts/${category.type.toLowerCase()}`}
              className={cn('text-sm px-3 py-1 bg-secondary rounded-3xl hover:bg-slate-300 transition-all', {
                'bg-primary text-white hover:bg-primary/80': category.type.toLowerCase() === selectedCategory,
              })}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
