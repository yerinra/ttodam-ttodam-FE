import { PostDetail } from '@/types/post';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

type BackToListBtnProps = {
  data: PostDetail;
};

export default function BackToListBtn({ data }: BackToListBtnProps) {
  return (
    <Button className="ml-auto mt-4 mb-20" variant={'outline'}>
      <Link to={`/posts/${data.post.category.toLowerCase()}`}>목록으로</Link>
    </Button>
  );
}
