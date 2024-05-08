import { useQuery } from '@tanstack/react-query';
import useRequireLogin from '@/hooks/useRequireLogin';
import { getMyPosts } from '@/apis/myPage/myPosts';
import useDeleteMyPostMutation from '@/hooks/queries/useDeleteMyPostMutation';
import { type PostPreview } from '@/types/post';

import MyPostItem from '@/components/myPostPage/MyPostItem';
import H1 from '@/components/atoms/H1';
import Error from '@/components/atoms/Error';
import Loading from '@/components/atoms/Loading';

export default function MyPostsPage() {
  useRequireLogin();

  const { data, error, isLoading } = useQuery<PostPreview[]>({
    queryKey: ['myPosts'],
    queryFn: getMyPosts,
  });

  const { mutateAsync } = useDeleteMyPostMutation();

  const handleDeletePost = async (postId: number) => {
    try {
      const confirmed = window.confirm('글을 삭제하시겠습니까?');

      if (confirmed) {
        await mutateAsync(postId);
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <H1>내가 쓴 글</H1>
      {data &&
        data.map(post => <MyPostItem key={post.postId} post={post} onDelete={() => handleDeletePost(post.postId)} />)}
    </div>
  );
}
