import { deleteBookmark } from '@/apis/myPage/bookmark';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
// import { BookMark } from '@/types/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBookmarkMutation = (isInDetailPage: boolean) => {
  const queryClient = useQueryClient();
  const { currentPostId } = useCurrentPostIdStore();
  // let handleBookmarkUpdate;

  // if (isInDetailPage) {
  //   handleBookmarkUpdate = (deletedBookmarkId: number) => {
  //     const previousData = queryClient.getQueryData<BookMark[]>(['bookmarks']);
  //     queryClient.setQueryData(['bookmarks'], previousData => {
  //       return (previousData as BookMark[])?.filter((item: BookMark) => item.id !== deletedBookmarkId) || [];
  //     });
  //     return { previousData };
  //   };
  // } else {
  //   handleBookmarkUpdate = () => {};
  // }
  return useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    // onMutate: handleBookmarkUpdate,
    onSuccess: () => {
      if (!isInDetailPage) queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      else queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
    },
    onError: () => {
      console.log('error!');
    },
  });
};
