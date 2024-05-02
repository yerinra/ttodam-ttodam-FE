import { getProfile } from '@/apis/myPage/profiles';
import useRequireLogin from '@/hooks/useRequireLogin';

import { Profile } from '@/mocks/handlers/myPage/profile';
import { useQuery } from '@tanstack/react-query';
// import { MdAddAPhoto } from 'react-icons/md';
import { Link } from 'react-router-dom';
import user from '@/assets/user.png';
import { Button } from '@/components/ui/button';
import H1 from '@/components/atoms/H1';
export default function ProfilePage() {
  useRequireLogin();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (isLoading) return <div>프로필 정보를 가져오는 중입니다.</div>;
  if (error) return <div>프로필 정보를 가져오는데 실패하였습니다.</div>;

  return (
    <section className="flex justify-center items-center flex-col">
      <H1>나의 프로필</H1>
      <div className="flex items-center flex-col mt-10">
        {profile && (
          <div key={profile.nickname}>
            <div className="relative w-[170px] h-[150px] flex items-center justify-center">
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt="프로필이미지"
                  className="flex items-center justify-center w-36 h-36 border rounded-[50%]"
                />
              ) : (
                <div className="relative w-[170px] h-[150px] flex items-center justify-center">
                  <img
                    src={user}
                    alt="프로필이미지"
                    className="flex items-center justify-center w-36 h-36 border rounded-[50%]"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-8 gap-10">
              <p className="py-0.5 px-3 border rounded-md text-lg">닉네임</p>
              <p>{profile.nickname}</p>
            </div>
            <div className="flex items-center justify-between mt-8 gap-10">
              <p className="py-0.5 px-3 border rounded-md text-lg">매너점수</p>
              <span>{profile.manners}점</span>

            </div>
          </div>
        )}
        <div className="flex items-center justify-center flex-col mt-8">
          <Link to="/my/edit/profile">
            <Button variant="secondary">수정하기</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-14 w-full">
        <Link
          to="/my/history"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-b text-center font-bold text-lg"
        >
          참여내역
        </Link>
        <Link
          to="/my/bookmark"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-b border-l text-center font-bold text-lg"
        >
          북마크
        </Link>
        <Link
          to="/my/keyword"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all text-center font-bold text-lg"
        >
          키워드
        </Link>
        <Link
          to="/my/posts"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-l text-center font-bold text-lg"
        >
          내가 쓴 글
        </Link>
      </div>
    </section>
  );
}
