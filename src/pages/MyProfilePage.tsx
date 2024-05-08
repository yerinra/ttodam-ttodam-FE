import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/myPage/profiles';
import useRequireLogin from '@/hooks/useRequireLogin';

import { type Profile as TProfile } from '@/types/profile';
import H1 from '@/components/atoms/H1';
import Loading from '@/components/atoms/Loading';
import Error from '@/components/atoms/Error';
import Profile from '@/components/profilePage/Profile';
import MyPageNavigation from '@/components/profilePage/MyPageNavigation';

export default function ProfilePage() {
  useRequireLogin();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<TProfile>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <section className="flex items-center flex-col">
      <H1>나의 프로필</H1>
      <Profile profile={profile as TProfile} />
      <MyPageNavigation />
    </section>
  );
}
