import { Link } from 'react-router-dom';

export default function HistoryList() {
  return (
    <div className="w-full mt-6">
      <Link
        to="/my/history/:postId"
        className="w-full flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] hover:bg-secondary gap-y-2 transition-all p-4"
      >
        <div className="flex items-center gap-x-2">
          <h2 className="font-bold text-xl">칫솔과 휴지를 함께 사실 분을 모집합니다!</h2>
        </div>
        <div className="flex">
          <ul className="flex flex-col gap-2 text-sm opacity-50">
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께 산 상품</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">모집상태</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">모집중</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께한 참여자</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 1</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 2</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 3</div>
            </li>
          </ul>
        </div>
      </Link>
      <Link
        to="/my/history/:postId"
        className="w-full flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] hover:bg-secondary gap-y-2 transition-all p-4"
      >
        <div className="flex items-center gap-x-2">
          <h2 className="font-bold text-xl">칫솔과 휴지를 함께 사실 분을 모집합니다!</h2>
        </div>
        <div className="flex">
          <ul className="flex flex-col gap-2 text-sm opacity-50">
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께 산 상품</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">모집상태</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">모집중</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께한 참여자</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 1</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 2</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 3</div>
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
}
