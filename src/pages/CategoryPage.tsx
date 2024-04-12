import { CATEGORIES } from '../lib/data';
import { Link } from 'react-router-dom';

export default function CategoryPage() {
  return (
    <section className="h-screen">
      <ul className="grid grid-cols-2 gap-y-3 tablet:gap-y-10 tablet:grid-cols-3 items-center justify-center tablet:p-5 tablet:pt-10">
        {CATEGORIES.map(category => (
          <li key={category.type} className="flex flex-col items-center justify-center h-[100px]">
            <Link to={`/posts/${category.type.toLowerCase()}`}>
              <button className="flex flex-col items-center gap-y-2 group">
                <div className="text-4xl tablet:text-5xl group-hover:scale-110 group-hover:text-primary transition-all">
                  {category.icon}
                </div>
                <div className="text-sm tablet:text-base">{category.name}</div>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
