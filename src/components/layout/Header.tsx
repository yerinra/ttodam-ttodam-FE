import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Header() {
  // 헤더 280px 기준으로 min-width padding 양쪽 20px씩 빼고 240px로 설정
  return (
    // <header className="flex max-w-[940px] w-full min-h-[50px] h-[80px] justify-center flex-col px-5 pt-7 pb-8 gap-4 min-w-[240px] bg-white z-[999] border border-x-0 border-t-0">
    //   <div className="flex w-full min-h-[50px] h-[96px] justify-between items-center">
    //     <h1 className="w-14 h-14">
    //       <Link to="/">
    //         <img src={logo} alt="또담또담" />
    //       </Link>
    //     </h1>
    //     <Link to="/login">
    //       <Button variant={'outline'} size={'sm'}>
    //         로그인
    //       </Button>
    //     </Link>
    //   </div>
    // </header>
    <header className="flex h-[70px] border-b w-full items-center justify-between px-5 bg-white z-[100]">
      <Link to="/" className="w-14">
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
