import Form from '@/components/postEditPage/Form';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPost } from '@/apis/post/post';
import type { PostDetail } from '@/types/post';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useEffect } from 'react';

export default function PostEditPage() {
  const { postId } = useParams();

  const { data, error, isLoading } = useQuery<PostDetail>({
    queryKey: ['post', postId],
    queryFn: () => {
      return getPost(+postId!);
    },
  });

  const { setCurrentPostId } = useCurrentPostIdStore();

  useEffect(() => {
    if (postId) {
      setCurrentPostId(+postId);
    } else {
      setCurrentPostId(null);
    }
    return () => setCurrentPostId(null);
  }, [postId, setCurrentPostId]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    // <div>게시글 {postId} 수정 페이지</div>
    <section className="px-5 w-full">
      <div className="flex items-center justify-between border-b border-black h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link to="/posts/all">
            <FaLongArrowAltLeft className="w-5 h-5" />
          </Link>
          <h3 className="font-semibold">모집글 수정</h3>
        </div>
      </div>
      <div>
        <Form data={data!} />
      </div>
    </section>
  );
}
