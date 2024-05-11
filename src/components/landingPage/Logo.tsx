import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export default function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className="min-w-15 max-w-20" />
    </Link>
  );
}
