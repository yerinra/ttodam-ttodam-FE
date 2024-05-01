import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';

// import { useQuery } from '@tanstack/react-query';
// import { getRequests } from '@/apis/post/request';

import { useChangeRequestStatusMutation } from '@/hooks/queries/useChangeRequestStatusMutation';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { UserRequest } from '@/types/post';

type RequestDialogProps = {
  requestList: UserRequest[];
  terminated: boolean;
};

export default function RequestDialog({ requestList, terminated }: RequestDialogProps) {
  const { currentPostId } = useCurrentPostIdStore();

  const { mutateAsync } = useChangeRequestStatusMutation(+currentPostId!);

  const handleAccept = async (requestId: number) => {
    const confirmed = window.confirm('승인하시겠습니까? 이 결정은 되돌릴 수 없습니다.');

    if (confirmed) {
      try {
        await mutateAsync({ requestId, newStatus: 'ACCEPT' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReject = async (requestId: number) => {
    const confirmed = window.confirm('거절하시겠습니까? 이 결정은 되돌릴 수 없습니다.');

    if (confirmed) {
      try {
        await mutateAsync({ requestId, newStatus: 'REFUSE' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>요청내역 확인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>요청내역</DialogTitle>
          {terminated && <div className="text-red-500">실패한 공구입니다. </div>}
        </DialogHeader>
        <ul>
          {requestList.map(request => (
            <li key={request.requestId} className="flex border-b first-of-type:border-t py-2 items-center">
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
                    <Button size={'sm'} disabled={terminated} onClick={() => handleAccept(request.requestId)}>
                      승인
                    </Button>
                    <Button
                      size={'sm'}
                      disabled={terminated}
                      variant={'outline'}
                      onClick={() => handleReject(request.requestId)}
                    >
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
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
