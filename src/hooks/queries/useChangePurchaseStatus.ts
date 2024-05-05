import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PurchaseStatus } from '@/types/post';
import { changePurchaseStatus } from '@/apis/post/post';

export const useChangePurchaseStatusMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const handleUpdatePurchaseStatus = ({
    postId,
    newPurchaseStatus,
  }: {
    postId: number;
    newPurchaseStatus: PurchaseStatus;
  }) => {
    return changePurchaseStatus(postId, newPurchaseStatus);
  };

  return useMutation({
    mutationFn: handleUpdatePurchaseStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
