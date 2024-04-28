import { PurchaseStatus, UserRequestStatus } from '@/types/post';
import { Button } from '../ui/button';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelRequest, postRequest } from '@/apis/post/request';

type RequestButtonSectionProps = {
  isOpen: boolean;
  postStatus: PurchaseStatus;
  userStatus: UserRequestStatus;
};

export default function RequestButtonSection({ isOpen, postStatus, userStatus }: RequestButtonSectionProps) {
  const { currentPostId } = useCurrentPostIdStore();

  const usePostRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => postRequest(currentPostId as number),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
      },
      onError: () => {
        console.log('error!');
      },
    });
  };

  const { mutateAsync: postMutateAsync } = usePostRequestMutation();
  const handleParticipate = async () => {
    await postMutateAsync();
  };

  // const useCancelRequestMutation = () => {
  //   const queryClient = useQueryClient();

  //   return useMutation({
  //     mutationFn: () => cancelRequest(),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
  //     },
  //     onError: () => {
  //       console.log('error!');
  //     },
  //   });
  // };

  if (isOpen && postStatus === 'PREPARING') {
    if (userStatus === 'NONE') return <Button onClick={handleParticipate}>참여 요청 보내기</Button>;
    else if (userStatus === 'ACCEPT') return <Button disabled={true}>요청이 승인되었습니다.</Button>;
    else if (userStatus === 'REFUSE') return <Button disabled={true}>요청이 거절되었습니다.</Button>;
    else if (userStatus === 'WAIT')
      return (
        <div className="flex gap-2">
          <Button disabled={true}>요청 승인 대기중</Button>
          <Button variant="outline">요청 취소하기</Button>
        </div>
      );
  } else {
    return <Button disabled={true}>요청을 보낼 수 없습니다.</Button>;
  }
}
