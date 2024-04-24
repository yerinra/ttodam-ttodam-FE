import { getProfiles } from '@/apis/myPage/profiles';
import { Profile } from '@/mocks/handlers/myPage/profile';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { Link } from 'react-router-dom';

// profileImgUrl
export default function ProfilePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => {
      return getProfiles();
    },
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getProfiles();
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles: ', error);
      }
    };
    fetchProfiles();
  }, []);

  if (isLoading) return <div>프로필 정보를 가져오는 중입니다.</div>;
  if (error) return <div>프로필 정보를 가져오는데 실패하였습니다.</div>;

  return (
    <section className="flex justify-center items-center flex-col mt-8">
      <h1 className="font-bold text-3xl">프로필</h1>
      <div className="flex items-center flex-col mt-10">
        {data &&
          data?.profile?.map((pf: Profile) => (
            <div key={pf.id}>
              <div className="relative w-[170px] h-[150px] flex items-center justify-center">
                {pf.profileImgUrl ? (
                  <img
                    src={pf.profileImgUrl}
                    alt="프로필이미지"
                    className="flex items-center justify-center w-36 h-36 border rounded-[50%]"
                  />
                ) : (
                  <div className="relative w-[170px] h-[150px] flex items-center justify-center">
                    <Link to="/my/edit/Profile">
                      <img
                        src={pf.profileImgUrl}
                        alt=""
                        className="flex items-center justify-center w-36 h-36 bg-slate-400 rounded-[50%]"
                      />
                      <MdAddAPhoto className=" absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-white" />
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-8 gap-10">
                <p className="py-0.5 px-3 border rounded-md text-lg">닉네임</p>
                <p>{pf.nickname}</p>
              </div>
              <div className="flex items-center justify-between mt-8 gap-10">
                <p className="py-0.5 px-3 border rounded-md text-lg">매너점수</p>
                <span>{pf.manners}점</span>
              </div>
            </div>
          ))}
        <div className="flex items-center justify-center flex-col mt-8">
          <Link to="/my/edit/Profile" className="py-0.5 px-3 bg-primary rounded-md text-white">
            수정하기
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
          to="/request"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-l text-center font-bold text-lg"
        >
          요청내역
        </Link>
      </div>
    </section>
  );
}
