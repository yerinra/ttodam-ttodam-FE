import { Button } from '../ui/button';

type HeaderBtnProps = {
  isUserPost: boolean | null | undefined;
};

export default function HeaderBtn({ isUserPost }: HeaderBtnProps) {
  return isUserPost ? (
    <div className="flex gap-2">
      <Button variant={'outline'}>수정</Button>
      <Button variant={'destructive'}>삭제</Button>
    </div>
  ) : (
    <Button variant={'outline'} size={'lg'}>
      1:1 채팅
    </Button>
  );
}
