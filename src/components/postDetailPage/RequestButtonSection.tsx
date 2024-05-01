import { PurchaseStatus, UserRequestStatus } from '@/types/post';
import { Button } from '../ui/button';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelRequest, postRequest } from '@/apis/post/request';
import useRequestIdStore from '@/store/requestIdStore';

type RequestButtonSectionProps = {
  isOpen: boolean;
  postStatus: PurchaseStatus;
  userStatus: UserRequestStatus;
};

export default function RequestButtonSection({ isOpen, postStatus, userStatus }: RequestButtonSectionProps) {
  const { currentPostId } = useCurrentPostIdStore();
  const { requestInfos, setRequestId, removeRequestId } = useRequestIdStore();
  const storedRequestId = requestInfos[currentPostId as number]?.requestId;
  // const [reqId, setReqId] = useState<number | null>();

  const usePostRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => postRequest(currentPostId as number),
      onSuccess: data => {
        // console.log(data);
        queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
        setRequestId(currentPostId as number, data);
      },
      onError: () => {
        console.log('error!');
      },
    });
  };

  const { mutateAsync: postMutateAsync } = usePostRequestMutation();
  const handleParticipate = async () => {
    await postMutateAsync();
    // console.log(requestId);
    // setReqId(requestId);
    // setRequestAndPostId(requestId, currentPostId as number);
  };

  const useCancelRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => cancelRequest(storedRequestId as number),
      onSuccess: () => {
        removeRequestId(currentPostId as number);
        queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
      },
      onError: () => {
        console.log('error!');
      },
    });
  };

  const { mutateAsync } = useCancelRequestMutation();

  const handleCancel = async () => {
    await mutateAsync();
  };
  if (isOpen && postStatus === 'PREPARING') {
    if (userStatus === 'NONE') return <Button onClick={handleParticipate}>참여 요청 보내기</Button>;
    else if (userStatus === 'ACCEPT') return <Button disabled={true}>요청이 승인되었습니다.</Button>;
    else if (userStatus === 'REFUSE') return <Button disabled={true}>요청이 거절되었습니다.</Button>;
    else if (userStatus === 'WAIT')
      return (
        <div className="flex gap-2">
          <Button disabled={true}>요청 승인 대기중</Button>
          <Button variant="outline" disabled={!storedRequestId} onClick={handleCancel}>
            요청 취소하기
          </Button>
        </div>
      );
  } else {
    return <Button disabled={true}>요청을 보낼 수 없습니다.</Button>;
  }
}
