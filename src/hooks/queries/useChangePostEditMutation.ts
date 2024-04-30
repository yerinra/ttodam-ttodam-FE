import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putPostEdit } from '@/apis/post/post';

export const useChangePostEditMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const handlePostEditChange = ({ postId, formData }: { postId: number; formData: FormData }) => {
    return putPostEdit(postId, formData);
  };

  return useMutation({
    mutationFn: handlePostEditChange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
