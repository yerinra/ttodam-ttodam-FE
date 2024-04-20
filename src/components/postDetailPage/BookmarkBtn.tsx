import { cn } from '@/lib/utils';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

type BookmarkBtnProps = {
  bookmarked: boolean;
  // handleAddBookmark: () => void;
};

export default function BookmarkBtn({ bookmarked }: BookmarkBtnProps) {
  return (
    <button className="absolute top-[78px] right-4">
      <BookmarkFilledIcon
        className={cn('h-[80px] w-auto ', { 'text-slate-200': !bookmarked }, { 'text-yellow-400': !!bookmarked })}
      />
    </button>
  );
}
