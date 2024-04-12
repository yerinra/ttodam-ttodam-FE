import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';

type CategorySelectorProps = {
  selectedCategory: string | undefined;
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

{
  /* <section className="flex flex-wrap gap-2">
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
      </section> */
}
