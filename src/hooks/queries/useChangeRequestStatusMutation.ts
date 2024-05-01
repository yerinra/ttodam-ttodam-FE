import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putRequest } from '@/apis/post/request';
import { UserRequestStatus } from '@/types/post';

export const useChangeRequestStatusMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const handleRequestChange = ({ requestId, newStatus }: { requestId: number; newStatus: UserRequestStatus }) => {
    return putRequest(requestId, newStatus);
  };

  return useMutation({
    mutationFn: handleRequestChange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['request', postId] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
