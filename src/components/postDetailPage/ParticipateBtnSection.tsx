import { Button } from '../ui/button';
import { type Post } from '@/types/post';
import RequestDialog from './RequestDialog';

// import { useCancelRequestMutation } from '@/hooks/queries/useCancelRequestMutation';
// import { usePostRequestMutation } from '@/hooks/queries/usePostRequestMutation';
// import { RequestStatus } from '@/types/request';


type ParticipateBtnSectionProps = {
  isUserPost: boolean | null | undefined;
  data: Post;
};

export default function ParticipateBtnSection({ isUserPost, data }: ParticipateBtnSectionProps) {

  // const stat: RequestStatus = 'wait';
  // const { mutateAsync: postRequestMutateAsync } = usePostRequestMutation(data.Id);
  // const { mutateAsync: cancelRequestMutateAsync } = useCancelRequestMutation(data.Id);
  // const handleParticipate = () => {
  //   if (stat === 'wait') postRequestMutateAsync(data.Id);
  //   else cancelRequestMutateAsync(3);
  // };
  return (
    <section className="flex justify-center ml-auto">
      {isUserPost && <RequestDialog data={data} />}
      {!isUserPost && (
        <Button size={'lg'} disabled={data.status !== 'in_progress'} onClick={() => console.log('해야됨')}>

          {data.status == 'in_progress'
            ? '참여요청 보내기'
            : data.status == 'completed'
              ? '모집이 완료되었습니다.'
              : '모집이 마감되었습니다.'}
        </Button>
      )}
    </section>
  );
}
