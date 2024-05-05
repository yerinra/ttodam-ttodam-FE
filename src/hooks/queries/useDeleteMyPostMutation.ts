import { deletePost } from '@/apis/post/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteMyPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
    },
    onError: () => {
      console.error('Error deleting post');
    },
  });
}
