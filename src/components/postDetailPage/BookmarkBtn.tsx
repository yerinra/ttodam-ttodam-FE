import { useAddBookmarkMutation } from '@/hooks/queries/useAddBookmarkMutation';
import { useDeleteBookmarkMutation } from '@/hooks/queries/useDeleteBookmarkMutation';
import { cn } from '@/lib/utils';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

import { useState } from 'react';

export default function BookmarkBtn() {
  const [bookmarked, setBookmarked] = useState(false);
  const { currentPostId } = useCurrentPostIdStore();

  const { mutateAsync: mutateDeleteAsync } = useDeleteBookmarkMutation();

  const handleDeleteBookmark = async () => {
    if (currentPostId !== null) {
      try {
        await mutateDeleteAsync(currentPostId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { mutateAsync: mutateAddAsync } = useAddBookmarkMutation(currentPostId);

  const handleAddBookmark = async () => {
    if (currentPostId !== null) {
      try {
        await mutateAddAsync(currentPostId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBookmarkClick = () => {
    if (bookmarked) {
      handleDeleteBookmark();
    } else {
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
