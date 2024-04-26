import { getMyPosts } from '@/apis/myPage/myPosts';
import { deletePost } from '@/apis/post/post';
import Badge from '@/components/atoms/Badge';
import H1 from '@/components/atoms/H1';
import ListItemContainer from '@/components/atoms/ListItemContainer';
import { Button } from '@/components/ui/button';
import { categoryNameKR } from '@/lib/utils';
import { Category, Post } from '@/types/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function MyPostsPage() {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['myPosts'],
    queryFn: getMyPosts,
  });

  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
    },
    onError: () => {
      console.error('Error deleting post');
    },
  });

  const handleDeletePost = async (postId: number) => {

    try {
      const confirmed = window.confirm('글을 삭제하시겠습니까?');

      if (confirmed) {
        await deletePostMutation.mutateAsync(postId);
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return (
    <div>
      <H1>내가 쓴 글</H1>
      {data &&
        data.map(post => (
          <ListItemContainer key={post.Id}>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="primary">{categoryNameKR(post.category as Exclude<Category, 'ALL'>)}</Badge>
                <div className="py-2">
                  <Link to={`/post/${post.Id}`} className="font-semibold">
                    {post.title}
                  </Link>
                  <div className="text-sm py-1">{post.content}</div>
                </div>
                <div className="text-sm text-dark-gray">{post.createAt}</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/post/edit/${post.Id}`}>
                  <Button variant="secondary" size="sm">
                    수정
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.Id)}>
                  삭제
                </Button>
              </div>
            </div>
          </ListItemContainer>
        ))}
    </div>
  );
}
