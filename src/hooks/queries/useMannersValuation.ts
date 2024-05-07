import { putValuation } from '@/apis/post/valuation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useMannersValuation(currentPostId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, valuations }: { postId: number; valuations: { userId: number; count: number }[] }) =>
      putValuation(postId, valuations),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });

      console.log('매너 평가가 성공적으로 전송되었습니다.');
    },
    onError: error => {
      console.error('매너 평가를 처리하는 동안 오류가 발생했습니다:', error);
    },
  });
}
