import { KAKAO_AUTH_URL } from '@/constants/auth';
import { Link } from 'react-router-dom';

const KakaoLogin = () => {
  return (
    <Link to={KAKAO_AUTH_URL} className="flex flex-col space-y-4">
      <button className=" bg-yellow-300 text-black px-10 py-4 rounded w-96">카카오 로그인</button>
    </Link>
  );
};

export default KakaoLogin;
