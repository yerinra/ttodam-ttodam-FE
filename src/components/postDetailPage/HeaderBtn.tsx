import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import { Post } from '@/types/post';

type HeaderBtnProps = {
  isUserPost: boolean | null | undefined;
  data: Post;
  handleDeletePost: (postId: number) => void;
};

export default function HeaderBtn({ isUserPost, data, handleDeletePost }: HeaderBtnProps) {
  return isUserPost ? (
    <div className="flex gap-2">
      <Link to={`/post/edit/${data.Id}`}>
        <Button variant={'outline'}>수정</Button>
      </Link>
      <Button variant={'destructive'} onClick={() => handleDeletePost(data.Id)}>
        삭제
      </Button>
    </div>
  ) : (
    <Button variant={'outline'} size={'lg'}>
      1:1 채팅
    </Button>
  );
}
