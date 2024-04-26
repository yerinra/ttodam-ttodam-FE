import { cancelRequest } from '@/apis/post/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelRequestMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: number) => cancelRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
