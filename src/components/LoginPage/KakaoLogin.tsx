import { KAKAO_AUTH_URL } from '@/constants/auth';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const KakaoLogin = () => {
  return (
    <Link to={KAKAO_AUTH_URL} className="">
      <Button className="w-full bg-yellow-300 hover:bg-yellow-300 text-black py-6">카카오 로그인</Button>
    </Link>
  );
};

export default KakaoLogin;
