import { postRequest } from '@/apis/post/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostRequestMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postRequest(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
