import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Profile as TProfile } from '@/types/profile';
import user from '@/assets/user.png';
import Badge from '../atoms/Badge';

type ProfileProps = {
  profile: TProfile;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <section className="flex items-center flex-col mt-10 my-2">
      <div className="flex flex-col items-center justify-center gap-5">
        {profile?.profileImageUrl && (
          <img src={profile.profileImageUrl} alt="프로필이미지" className="w-24 h-24 border rounded-full" />
        )}
        {!profile?.profileImageUrl && <img src={user} alt="프로필이미지" className="w-24 h-24 border rounded-full" />}
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-bold">{profile?.nickname}</div>
          <Badge variant="primary">{profile?.manners}점</Badge>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col mt-8">
        <Link to="/my/edit/profile">
          <Button variant="secondary" size="sm">
            수정하기
          </Button>
        </Link>
      </div>
    </section>
  );
}
