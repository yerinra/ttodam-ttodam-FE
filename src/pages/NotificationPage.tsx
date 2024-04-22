import H1 from '@/components/atoms/H1';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export default function NotificationPage() {
  return (
    <div>
      <H1>알림</H1>
      <div className="flex ml-4 mb-3">
        총 <p className="text-primary ml-1">10</p>건의 알림이 도착했습니다.
      </div>
      <li className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all">
        <div className="flex items-center gap-x-2">
          <Link to={`/`} className="flex items-center">
            <p className="px-[6px] py-[2px] bg-slate-200 rounded-sm text-sm text-gray-500 mr-1">키워드</p>
            <p className="text-primary ml-1 font-bold">휴지</p>에 대한 새 글이 올라왔어요.
          </Link>

          <button className="ml-auto">
            <Cross1Icon />
          </button>
        </div>
        <p className="text-sm text-gray-400">2024-04-21 02:16:23</p>
      </li>
      <li className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all">
        <div className="flex items-center gap-x-2">
          <Link to={`/`} className="flex items-center">
            <p className="px-[6px] py-[2px] bg-slate-200 rounded-sm text-sm text-gray-500 mr-1">요청</p>
            <p className="text-primary ml-1 font-bold">또담</p>
            님이 참여를 요청하셨어요.
          </Link>

          <button className="ml-auto">
            <Cross1Icon />
          </button>
        </div>
        <p className="text-sm text-gray-400">2024-04-21 02:16:23</p>
      </li>
      <li className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all">
        <div className="flex items-center gap-x-2">
          <Link to={`/`} className="flex items-center">
            <p className="px-[6px] py-[2px] bg-slate-200 rounded-sm text-sm text-gray-500 mr-1">요청</p>
            <p className="text-primary ml-1 font-bold">홍길동</p>님이 참여를 승인하셨어요.
          </Link>

          <button className="ml-auto">
            <Cross1Icon />
          </button>
        </div>
        <p className="text-sm text-gray-400">2024-04-21 02:16:23</p>
      </li>
      <li className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all">
        <div className="flex items-center gap-x-2">
          <Link to={`/`} className="flex items-center">
            <p className="px-[6px] py-[2px] bg-slate-200 rounded-sm text-sm text-gray-500 mr-1">요청</p>
            <p className="text-primary ml-1 font-bold">홍길동</p>님이 참여를 거절하셨어요.
          </Link>

          <button className="ml-auto">
            <Cross1Icon />
          </button>
        </div>
        <p className="text-sm text-gray-400">2024-04-21 02:16:23</p>
      </li>
    </div>
  );
}
