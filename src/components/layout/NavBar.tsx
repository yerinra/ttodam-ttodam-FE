import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function NavBar() {
  const { pathname } = useLocation();
  const isMatchingPath = (path: string) => {
    if (pathname === '/') {
      return pathname === path;
    } else if (pathname.startsWith('/post')) {
      return path == '/posts/all';
    } else if (pathname.startsWith('/my')) {
      return path.startsWith('/my');
    } else {
      return pathname.includes(path);
    }
  };

  return (
    <nav className="w-full h-[65px] fixed max-w-[940px] bottom-0 border border-t-1 border-x-0 border-b-0 bg-slate-200">
      <ul className="flex justify-between items-center w-full h-full px-10">
        {NAVIGATION.map(nav => (
          <li key={nav.path}>
            <Link
              to={nav.path}
              className={cn('flex flex-col items-center hover:scale-105 hover:font-bold transition-all', {
                'text-primary font-bold': isMatchingPath(nav.path),
              })}
            >
              <div className="text-2xl">{nav.icon}</div>
              <div className="text-sm">{nav.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
