import { Button } from '../ui/button';
import { PROFILE_NAVIGATION_LINKS } from '@/constants/data';
import { Link } from 'react-router-dom';

export default function MyPageNavigation() {
  return (
    <ul className="w-full max-w-xl grid grid-cols-2 place-items-center mt-10 gap-2">
      {PROFILE_NAVIGATION_LINKS.map(nav => (
        <Button variant="outline" key={nav.path} className="w-full group">
          <Link to={nav.path} className="group-hover:text-primary transition-all">
            {nav.label}
          </Link>
        </Button>
      ))}
    </ul>
  );
}
