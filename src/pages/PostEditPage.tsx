import { useParams } from 'react-router-dom';

export default function PostEditPage() {
  const { postId } = useParams();
  return <div>게시글 {postId} 수정 페이지</div>;
}
