import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  // 헤더 280px 기준으로 min-width padding 양쪽 20px씩 빼고 240px로 설정
  return (
    <header className="flex max-w-[940px] w-full min-h-[50px] h-[90px] items-center flex-col px-5 pt-5 pb-8 gap-4 min-w-[240px] bg-white z-[999] border border-x-0 border-t-0">
      <div className="flex w-full min-h-[50px] h-[96px] justify-between items-center">
        <h1 className="w-16 h-16">
          <Link to="/">
            <img src={logo} alt="또담또담" />
          </Link>
        </h1>
        <Link
          to="/login"
          className="flex justify-center items-center bg-primary w-16 h-7 py-1.5 px-2 text-white rounded-md"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
