// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import { KAKAO_AUTH_URL } from '@/lib/data';
import { Link } from 'react-router-dom';

const KakaoLogin = () => {
  // const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    // try {
    //   const response = await axios.get(`${env.REACT_APP_REDIRECT_URL}/kakao/login`);
    //   const { data } = response;
    //   localStorage.setItem('name', data.account.kakaoName);
    //   navigate('/');
    // } catch (error) {
    //   console.error('카카오톡 로그인 실패:', error);
    // }
  };

  return (
    <Link to={KAKAO_AUTH_URL} className="flex flex-col space-y-4">
      <button onClick={handleKakaoLogin} className=" bg-yellow-300 text-black px-10 py-4 rounded w-96">
        카카오톡 로그인
      </button>
    </Link>
  );
};

export default KakaoLogin;
