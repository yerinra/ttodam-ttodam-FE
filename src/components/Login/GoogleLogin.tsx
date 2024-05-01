import { GOOGLE_AUTH_URL } from '@/constants/auth';
import { Link } from 'react-router-dom';

const GoogleLogin = () => {
  return (
    <Link to={GOOGLE_AUTH_URL} className="flex flex-col space-y-4">
      <button className="bg-white border-black text-black border border-solid px-10 py-4 rounded w-96">
        구글 로그인
      </button>
    </Link>
  );
};

export default GoogleLogin;
