import { useNavigate, Link } from 'react-router-dom';
import useRequireLogin from '@/hooks/useRequireLogin';
import { QueryClient } from '@tanstack/react-query';
import { deleteUserAccount } from '@/apis/myPage/profiles';
import { useCookies } from 'react-cookie';
import useUserIsLoggedInStore from '@/store/isLoginStore';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import EditProfileForm from './EditProfileForm';
import { Button } from '../ui/button';

export default function EditProfilePage() {
  useRequireLogin();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['AccessToken']);
  const { resetIsLoggedIn } = useUserIsLoggedInStore();
  const queryClient = new QueryClient();

  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
      try {
        await deleteUserAccount();
        resetIsLoggedIn();
        removeCookie('AccessToken', { path: '/login/oauth2/code' });
        removeCookie('AccessToken', { path: '/' });
        queryClient.invalidateQueries({ queryKey: ['accessToken'] });
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="px-5 w-full h-screen">
      <div className="flex items-center justify-between border-b border-black h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link to="/my/profile">
            <FaLongArrowAltLeft className="w-5 h-5" />
          </Link>
          <h3 className="font-semibold">프로필 수정</h3>
        </div>
      </div>
      <div>
        <EditProfileForm />
        <div className="flex items-center justify-end">
          <Button
            variant={'outline'}
            size={'lg'}
            className="w-[80px] h-8  py-0.5 px-3 rounded-md mt-28 text-[#9ca3af]"
            onClick={handleDeleteAccount}
          >
            회원탈퇴
          </Button>
        </div>
      </div>
    </section>
  );
}
