// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import { GOOGLE_AUTH_URL } from '@/lib/data';
import { Link } from 'react-router-dom';

const GoogleLogin = () => {
  // const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    // try {
    //   const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URL}/google/login`);
    //   const { data } = response;
    //   localStorage.setItem('name', data.account.googleName);
    //   navigate('/');
    // } catch (error) {
    //   console.error('구글 소셜 로그인 실패:', error);
    // }
  };

  return (
    <Link to={GOOGLE_AUTH_URL} className="flex flex-col space-y-4">
      <button
        onClick={handleGoogleLogin}
        className="bg-white border-black text-black border border-solid px-10 py-4 rounded w-96"
      >
        구글 로그인
      </button>
    </Link>
  );
};

export default GoogleLogin;
