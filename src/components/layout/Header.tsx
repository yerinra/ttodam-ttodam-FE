import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Header() {
  // 헤더 280px 기준으로 min-width padding 양쪽 20px씩 빼고 240px로 설정
  return (
    <header className="flex h-[70px] border-b w-full items-center justify-between px-5 bg-white z-[100]">
      <Link to="/home" className="w-14">
        <img src={logo} alt="또담또담" />
      </Link>
      <Link to="/login">
        <Button variant="outline" size="sm">
          로그인
        </Button>
      </Link>
    </header>
  );
}
