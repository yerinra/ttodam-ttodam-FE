import { GOOGLE_AUTH_URL } from '@/constants/auth';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const GoogleLogin = () => {
  return (
    <Link to={GOOGLE_AUTH_URL} className="flex flex-col space-y-4">
      <Button className="bg-white border border-black text-black hover:bg-white py-6">구글 로그인</Button>
    </Link>
  );
};

export default GoogleLogin;
