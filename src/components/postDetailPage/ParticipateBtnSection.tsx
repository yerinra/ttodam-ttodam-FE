import { Button } from '../ui/button';
import { UserRequest, type PostDetail, PurchaseStatus } from '@/types/post';
import RequestDialog from './RequestDialog';
import { useState } from 'react';
import PurchaseStatusDialog from './PurchaseStatusDialog';

// import { useCancelRequestMutation } from '@/hooks/queries/useCancelRequestMutation';
// import { usePostRequestMutation } from '@/hooks/queries/usePostRequestMutation';
// import { RequestStatus } from '@/types/request';

type ParticipateBtnSectionProps = {
  isUserPost: boolean | null | undefined;
  data: PostDetail;
  requestList: UserRequest[];
};

export default function ParticipateBtnSection({ isUserPost, data, requestList }: ParticipateBtnSectionProps) {
  const { post } = data;

  // const { mutateAsync: postRequestMutateAsync } = usePostRequestMutation(data.Id);
  // const { mutateAsync: cancelRequestMutateAsync } = useCancelRequestMutation(data.Id);
  // const handleParticipate = () => {
  //   if (stat === 'wait') postRequestMutateAsync(data.Id);
  //   else cancelRequestMutateAsync(3);
  // };

  return (
    <section className="flex justify-center ml-auto">
      {isUserPost && post.status !== 'COMPLETED' && <RequestDialog requestList={requestList} />}
      {isUserPost && post.status == 'COMPLETED' && <PurchaseStatusDialog status={post.purchaseStatus} />}
      {!isUserPost && (
        <Button size={'lg'} disabled={post.status !== 'IN_PROGRESS'} onClick={() => console.log('해야됨')}>
          {post.status == 'IN_PROGRESS' ? '참여요청 보내기' : '요청을 보낼 수 없습니다.'}
        </Button>
      )}
    </section>
  );
}
