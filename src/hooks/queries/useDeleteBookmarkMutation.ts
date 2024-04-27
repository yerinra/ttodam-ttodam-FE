import { deleteBookmark } from '@/apis/myPage/bookmark';
import { BookMark } from '@/types/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    onMutate: (deletedBookmarkId: number) => {
      const previousData = queryClient.getQueryData<BookMark[]>(['bookmarks']);
      queryClient.setQueryData(['bookmarks'], previousData => {
        return (previousData as BookMark[])?.filter((item: BookMark) => item.id !== deletedBookmarkId) || [];
      });
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
