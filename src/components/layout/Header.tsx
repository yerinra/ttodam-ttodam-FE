import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import useUserIsLoggedInStore from '@/store/isLoginStore';
import { useCookies } from 'react-cookie';

export default function Header() {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['AccessToken']);
  const { isLoggedIn, resetIsLoggedIn } = useUserIsLoggedInStore();

  const logout = () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (confirmed) {
      resetIsLoggedIn();
      removeCookie('AccessToken', { path: '/login/oauth2/code' });
      removeCookie('AccessToken', { path: '/' });
      navigate('/');
    }
  };

  return (
    <header className="flex h-[70px] border-b w-full items-center justify-between px-5 bg-white z-[100]">
      <Link to="/home" className="w-14">
        <img src={logo} alt="또담또담" />
      </Link>
      {isLoggedIn && <Button onClick={logout}>로그아웃</Button>}
      {!isLoggedIn && (
        <Link to="/login">
          <Button variant="outline" size="sm">
            로그인
          </Button>
        </Link>
      )}
    </header>
  );
}
