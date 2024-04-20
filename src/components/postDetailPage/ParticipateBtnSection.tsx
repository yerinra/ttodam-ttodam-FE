import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Post } from '@/lib/types';

type ParticipateBtnSectionProps = {
  isUserPost: boolean | null | undefined;
  data: Post;
};
export default function ParticipateBtnSection({ isUserPost, data }: ParticipateBtnSectionProps) {
  return (
    <section className="flex justify-center ml-auto">
      {isUserPost ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>요청내역 확인</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>요청내역</DialogTitle>
              <DialogDescription>다른 회원들에게서 온 요청을 확인해보세요.</DialogDescription>
            </DialogHeader>
            <div>요청 1.</div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
