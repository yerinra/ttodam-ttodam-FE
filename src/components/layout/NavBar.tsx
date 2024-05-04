import { Link, useLocation } from 'react-router-dom';

import { cn, isMatchingPath } from '@/lib/utils';
import { NAVIGATION } from '@/constants/data';

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full h-[60px] fixed max-w-[940px] bottom-0 border border-t-1 border-x-0 border-b-0 bg-slate-200 z-[10]">
      <ul className="flex justify-between items-center w-full h-full px-10">
        {NAVIGATION.map(nav => (
          <li key={nav.path}>
            <Link
              to={nav.path}
              className={cn('flex flex-col items-center hover:scale-105 hover:font-bold transition-all', {
                'text-primary font-bold': isMatchingPath(nav.path, pathname),
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
