import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Post } from '@/lib/types';

type BackToListBtnProps = {
  data: Post;
};

export default function BackToListBtn({ data }: BackToListBtnProps) {
  return (
    <Button className="ml-auto mt-4 mb-20" variant={'outline'}>
      <Link to={`/posts/${data?.category.toLowerCase()}`}>목록으로</Link>
    </Button>
  );
}
