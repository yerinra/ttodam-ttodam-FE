import { Link } from 'react-router-dom';

export default function HistoryList() {
  return (
    <div className="flex w-full flex-col mt-10">
      <div className="flex justify-center gap-7 mt-10">
        <div className="w-36 h-36 bg-gray-500 "></div>
        <div>
          <div className="flex items-center justify-between gap-10 mb-3">
            <p className="py-0.5 px-3 border rounded-md text-lg">제품명</p>
            <p className="w-[150px] text-left">휴지</p>
          </div>
          <div className="flex items-center justify-between gap-10 mb-3">
            <p className="py-0.5 px-3 border rounded-md text-lg">제품 링크</p>
            <p className="w-[150px] text-left">https</p>
          </div>
          <div className="flex items-center justify-between gap-10 mb-3">
            <p className="py-0.5 px-3 border rounded-md text-lg">상태</p>
            <p className="w-[150px] text-left">모집중</p>
          </div>
          <div className="flex items-center justify-between gap-10 mb-3">
            <p className="py-0.5 px-3 border rounded-md text-lg">함께한 참여자</p>
            <p className="w-[150px] text-left">유저 100</p>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center flex-col mt-8">
        <Link to="/my/history/:postId" className="flex justify-center py-0.5 px-3 bg-primary rounded-md text-white">
          보기
        </Link>
      </div>
    </div>
  );
}
