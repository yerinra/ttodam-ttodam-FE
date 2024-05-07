import { UserRequest } from '@/types/post';
import { Button } from '../ui/button';

type RequestListItemProps = {
  request: UserRequest;
  terminated: boolean;
  onAccept: () => void;
  onReject: () => void;
};

export default function RequestListItem({ request, terminated, onAccept, onReject }: RequestListItemProps) {
  return (
    <li className="flex border-b first-of-type:border-t py-2 items-center">
      <section>
        <div className="flex gap-2 items-center">
          <div className="text-sm w-14 text-dark-gray">닉네임</div>
          <div className="font-semibold text-primary">{request.requestUserNickname}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm w-14 text-dark-gray">매너점수</div>
          <div>{+request.requestUserManners * 20} 점</div>
        </div>
      </section>
      <div className="ml-auto flex gap-2">
        {request.requestStatus == 'WAIT' && (
          <>
            <Button size={'sm'} disabled={terminated} onClick={onAccept}>
              승인
            </Button>
            <Button size={'sm'} disabled={terminated} variant={'outline'} onClick={onReject}>
              거절
            </Button>
          </>
        )}
        {request.requestStatus == 'ACCEPT' && (
          <div className="text-sm font-semibold text-gray-400">이미 승인된 유저입니다.</div>
        )}
        {request.requestStatus == 'REFUSE' && (
          <div className="text-sm font-semibold text-gray-400">이미 거절된 유저입니다.</div>
        )}
      </div>
    </li>
  );
}
