import { postData } from '@/lib/data';
import { postPreview } from '@/lib/types';

import { useParams } from 'react-router-dom';
export default function PostDetailPage() {
  const { postId } = useParams();
  const post: postPreview = postData.filter(p => postId && p.id == +postId)[0];
  return (
    <div>
      postId : {postId} 글<div>{post.title}</div>
    </div>
  );
}
