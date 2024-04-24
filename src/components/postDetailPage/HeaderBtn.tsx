import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/apis/post/post';

type HeaderBtnProps = {
  isUserPost: boolean | null | undefined;
};

export default function HeaderBtn({ isUserPost }: HeaderBtnProps) {
  const { currentPostId } = useCurrentPostIdStore();
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      // 포스트 삭제 성공 시, 쿼리 캐시를 업데이트하고 리스트 페이지로 이동
      queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
      location.href = '/posts/all';
    },
    onError: () => {
      console.error('Error deleting post');
    },
  });

  const handleDeletePost = async () => {
    if (currentPostId) deletePostMutation.mutateAsync(currentPostId);
  };

  return isUserPost ? (
    <div className="flex gap-2">
      <Link to={`/post/edit/${currentPostId}`}>
        <Button variant={'outline'}>수정</Button>
      </Link>
      <Button variant={'destructive'} onClick={handleDeletePost}>
        삭제
      </Button>
    </div>
  ) : (
    <Button variant={'outline'} size={'lg'}>
      1:1 채팅
    </Button>
  );
}
