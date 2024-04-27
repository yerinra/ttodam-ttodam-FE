import { addBookmark } from '@/apis/myPage/bookmark';
// import { BookMark } from '@/types/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBookmarkMutation = (currentPostId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: number) => addBookmark(bookmarkId),
    onSuccess: () => {
      if (currentPostId) {
        queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
      }
    },
    onError: () => {
      console.log('error!');
    },
  });
};
