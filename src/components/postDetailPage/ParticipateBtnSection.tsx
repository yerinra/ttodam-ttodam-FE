import { Button } from '../ui/button';
import { Post } from '@/lib/types';
import ParticipationDialog from './ParticipationDialog';
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '@/apis/post/request';
import { Request, requestsMockDataType } from '@/mocks/mockData/post/requests';

type ParticipateBtnSectionProps = {
  isUserPost: boolean | null | undefined;
  data: Post;
};

export default function ParticipateBtnSection({ isUserPost, data }: ParticipateBtnSectionProps) {
  // const {
  //   data: requestsData,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['request', data.Id],
  //   queryFn: () => {
  //     return getRequests(+data.Id!);
  //   },
  // });

  return (
    <section className="flex justify-center ml-auto">
      {isUserPost ? (
        <ParticipationDialog data={data} />
      ) : (
        <Button size={'lg'} disabled={data.status !== 'in_progress'}>
          {data.status == 'in_progress'
            ? '참여신청하기'
            : data.status == 'completed'
              ? '모집이 완료되었습니다.'
              : '마감되었습니다.'}
        </Button>
      )}
    </section>
  );
}
