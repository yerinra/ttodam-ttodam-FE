import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';

import { useQuery } from '@tanstack/react-query';
import { getRequests } from '@/apis/post/request';
import { type Post } from '@/types/post';
import { Request } from '@/types/request';

type ParticipationDialogProps = {
  data: Post;
};

export default function ParticipationDialog({ data }: ParticipationDialogProps) {
  const {
    data: requestsData,
    error,
    isLoading,
  } = useQuery<Request[]>({
    queryKey: ['request', data.Id],
    queryFn: () => {
      return getRequests(+data.Id!);
    },
  });

  if (error) return <div>에러가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>요청내역 확인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>요청내역</DialogTitle>
        </DialogHeader>
        <ul>
          {requestsData &&
            requestsData.map(request => (
              <li key={request.requestUser.id} className="flex border-b first-of-type:border-t py-2 items-center">
                <section>
                  <div className="flex gap-2 items-center">
                    <div className="text-sm w-14 text-dark-gray">닉네임</div>
                    <div className="font-semibold text-primary">{request.requestUser.nickname}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-sm w-14 text-dark-gray">매너점수</div>
                    <div>{request.requestUser.manners * 20} 점</div>
                  </div>
                </section>
                <div className="ml-auto flex gap-2">
                  <Button size={'sm'}>승인</Button>
                  <Button size={'sm'} variant={'outline'}>
                    거절
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
