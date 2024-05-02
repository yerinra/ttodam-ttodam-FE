import { cn } from '@/lib/utils';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

type BookmarkBtnProps = {
  bookmarkId: boolean;
  isBookmarked: boolean;
};

export default function BookmarkBtn({ isBookmarked }: BookmarkBtnProps) {
  return (
    <button className="absolute top-[-5px] right-[5px]">
      <BookmarkFilledIcon
        className={cn('h-[40px] w-auto ', { 'text-slate-200': !isBookmarked }, { 'text-yellow-400': !!isBookmarked })}
      />
    </button>
  );
}
