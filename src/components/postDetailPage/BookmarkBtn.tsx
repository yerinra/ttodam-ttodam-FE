import { addBookmark, deleteBookmark } from '@/apis/myPage/bookmark';
import { useAddBookmarkMutation } from '@/hooks/queries/useAddBookmarkMutation';
import { useDeleteBookmarkMutation } from '@/hooks/queries/useDeleteBookmarkMutation';
import { cn } from '@/lib/utils';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { BookMark } from '@/types/bookmark';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// type BookmarkBtnProps = {
//   bookmarked: boolean;
//   // handleAddBookmark: () => void;
// };

export default function BookmarkBtn() {
  const [bookmarked, setBookmarked] = useState(false);
  const { currentPostId } = useCurrentPostIdStore;

  const { mutateAsync: mutateDeleteAsync } = useDeleteBookmarkMutation();
  const handleDeleteBookmark = async () => {
    try {
      await mutateDeleteAsync(currentPostId);
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };
  const { mutateAsync: mutateAddAsync } = useAddBookmarkMutation();

  const handleAddBookmark = async () => {
    try {
      await mutateAddAsync(currentPostId);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBookmarkClick = () => {
    if (bookmarked) {
      // 이미 북마크되어 있는 경우 북마크를 제거합니다.
      handleDeleteBookmark();
    } else {
      // 북마크되어 있지 않은 경우 북마크를 추가합니다.
      handleAddBookmark();
    }
  };

  return (
    <button className="absolute top-[55px] right-4" onClick={handleBookmarkClick}>
      <BookmarkFilledIcon
        className={cn('h-[90px] w-auto ', { 'text-slate-200': !bookmarked }, { 'text-yellow-400': !!bookmarked })}
      />
    </button>
  );
}
