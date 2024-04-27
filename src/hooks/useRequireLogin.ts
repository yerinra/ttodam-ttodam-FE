import useUserIsLoggedInStore from '@/store/isLoginStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRequireLogin() {
  const { isLoggedIn } = useUserIsLoggedInStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);
}
