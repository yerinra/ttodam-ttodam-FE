type BookmarkCountProps = {
  bookmarkCount: number;
};

export default function BookmarkCount({ bookmarkCount }: BookmarkCountProps) {
  return (
    <div className="flex ml-4 mb-3">
      총 <p className="text-primary ml-1">{bookmarkCount}</p>개의 북마크가 있습니다.
    </div>
  );
}
