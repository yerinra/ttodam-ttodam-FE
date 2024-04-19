import { getBookmarks } from '@/apis/myPage/bookmark';
import PostPreview from '@/components/postListPage/PostPreview';
import { BookMark } from '@/mocks/handlers/myPage/bookmark';
import { useQuery } from '@tanstack/react-query';

export default function BookMarkPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => {
      return getBookmarks();
    },
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  if (data?.list?.length === 0) return <div>등록한 북마크가 없습니다.</div>;
  return (
    <div>
      <h1 className="font-bold text-3xl">나의 북마크</h1>
      {data && data?.list?.map((bm: BookMark) => <li key={bm.id}>{bm.title}</li>)}
    </div>
  );
}
