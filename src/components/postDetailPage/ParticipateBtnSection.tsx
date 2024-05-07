import type { UserRequest, PostDetail } from '@/types/post';
import RequestDialog from './RequestDialog';
import PurchaseStatusDialog from './PurchaseStatusDialog';
import RequestButtonSection from './RequestButtonSection';
import MannersValuationDialog from './MannersValuationDialog';

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

  return (
    <section className="flex justify-center ml-auto">
      {isUserPost && post.status !== 'COMPLETED' && (
        <RequestDialog
          requestList={requestList}
          terminated={post.status === 'FAILED' || post.purchaseStatus === 'FAILURE'}
        />
      )}
      {isUserPost && post.purchaseStatus === 'FAILURE' && <div>취소된 공구입니다.</div>}
      {isUserPost &&
        post.status == 'COMPLETED' &&
        post.purchaseStatus !== 'FAILURE' &&
        post.purchaseStatus !== 'SUCCESS' && <PurchaseStatusDialog status={post.purchaseStatus} />}
      {post.purchaseStatus === 'SUCCESS' &&
        (data.loginUserRequestStatus == 'AUTHOR' || data.loginUserRequestStatus !== 'ACCEPT') && (
          <MannersValuationDialog requestList={data.requestList} />
        )}
      {!isUserPost && (
        <RequestButtonSection
          isOpen={data.post.status === 'IN_PROGRESS'}
          postStatus={post.purchaseStatus}
          userStatus={data.loginUserRequestStatus}
        />
      )}
    </section>
  );
}
