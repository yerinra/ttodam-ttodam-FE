import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
import { Button } from '../ui/button';

export default function EditProfile() {
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
          <Button variant={'outline'} size={'lg'} className="w-[80px] h-8  py-0.5 px-3 rounded-md mt-28 text-[#9ca3af]">
            회원탈퇴
          </Button>
        </div>
      </div>
    </section>
  );
}
