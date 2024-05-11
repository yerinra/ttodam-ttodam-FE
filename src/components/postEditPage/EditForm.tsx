import { getPost } from '@/apis/post/post';
import { PostDetail } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function EditForm() {
  const { postId } = useParams();

  const { data } = useQuery<PostDetail>({
    queryKey: ['post', postId],
    queryFn: () => {
      return getPost(+postId!);
    },
  });

  return <div></div>;
}
