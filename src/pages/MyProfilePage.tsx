import { Link } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <section className="flex justify-center items-center flex-col mt-8">
      <h1 className="font-bold text-3xl">프로필</h1>
      <div className="flex items-center flex-col mt-10">
        <div className="w-36 h-36 bg-gray-500 rounded-[50%]"></div>
        <div className="flex items-center justify-between mt-8 gap-10">
          <p className="py-0.5 px-3 border rounded-md text-lg">닉네임</p>
          <p>유저 닉네임</p>
        </div>
        <div className="flex items-center justify-between mt-8 gap-10">
          <p className="py-0.5 px-3 border rounded-md text-lg">매너점수</p>
          <span>*****</span>
        </div>
        <div className="flex items-center justify-center flex-col mt-8">
          <Link to="/my/edit/Profile" className="py-0.5 px-3 bg-primary rounded-md text-white">
            수정하기
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-14 w-full">
        <Link
          to="/my/history"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-b text-center font-bold"
        >
          참여내역
        </Link>
        <Link
          to="/my/bookmark"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-b border-l text-center font-bold"
        >
          북마크
        </Link>
        <Link
          to="/my/keyword"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all text-center font-bold"
        >
          키워드
        </Link>
        <Link
          to="/request"
          className="py-3 px-3 text-black hover:bg-secondary gap-y-2 transition-all border-light-gray border-l text-center font-bold"
        >
          요청내역
        </Link>
      </div>
    </section>
  );
}
