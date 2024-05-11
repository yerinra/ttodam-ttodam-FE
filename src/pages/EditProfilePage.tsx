import { useNavigate, Link } from 'react-router-dom';
import useRequireLogin from '@/hooks/useRequireLogin';
import { QueryClient } from '@tanstack/react-query';
import { deleteUserAccount } from '@/apis/myPage/profiles';
import { useCookies } from 'react-cookie';
import useUserIsLoggedInStore from '@/store/isLoginStore';
import EditProfileForm from '../components/editProfilePage/EditProfileForm';
import { Button } from '../components/ui/button';
import H1 from '@/components/atoms/H1';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

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
    <>
      <Link to="/my/profile" className="w-full flex items-center justify-between border-b h-[60px] gap-2.5 mx-5">
        <ChevronLeftIcon className="w-5 h-5 ml-5" />
      </Link>

      <H1>프로필 수정</H1>
      <EditProfileForm />
      <Button variant={'outline'} size={'sm'} className="mt-28 mb-10 mr-5 text-[#9ca3af]" onClick={handleDeleteAccount}>
        회원탈퇴
      </Button>
    </>
  );
}
