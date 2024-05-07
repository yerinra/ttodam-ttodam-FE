import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';

import { useChangeRequestStatusMutation } from '@/hooks/queries/useChangeRequestStatusMutation';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { UserRequest } from '@/types/post';
import RequestListItem from './RequestListItem';

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
            <RequestListItem
              key={request.requestId}
              terminated={terminated}
              request={request}
              onAccept={() => handleAccept(request.requestId)}
              onReject={() => handleReject(request.requestId)}
            />
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
