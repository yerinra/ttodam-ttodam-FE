import { addBookmark } from '@/apis/myPage/bookmark';
// import { BookMark } from '@/types/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: number) => addBookmark(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
