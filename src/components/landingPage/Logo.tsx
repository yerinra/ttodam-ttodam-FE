import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export default function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className="w-20 h-20" />
    </Link>
  );
}
