import { getMyPosts } from '@/apis/myPage/myPosts';
import { deletePost } from '@/apis/post/post';
import Badge from '@/components/atoms/Badge';
import Error from '@/components/atoms/Error';
import H1 from '@/components/atoms/H1';
import ListItemContainer from '@/components/atoms/ListItemContainer';
import Loading from '@/components/atoms/Loading';
import MyPostItem from '@/components/myPostPage/MyPostItem';
import { Button } from '@/components/ui/button';
import useDeleteMyPostMutation from '@/hooks/queries/useDeleteMyPostMutation';
import useRequireLogin from '@/hooks/useRequireLogin';
import { categoryNameKR } from '@/lib/utils';
import { Category, PostPreview } from '@/types/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
