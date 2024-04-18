import { getBookmarks } from '@/apis/myPage/bookmark';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import usePagination from '@/hooks/usePagination';
import PaginationSection from '@/components/postListPage/PaginationSection';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AxiosResponse } from 'axios';
import { Bookmark, BookmarkResponse } from '@/mocks/mockData/mypage/bookmarks';

export default function BookMarkPage() {
  const { data, error, isLoading } = useQuery<AxiosResponse<BookmarkResponse>>({
    queryKey: ['bookmarks'],
    queryFn: () => {
      return getBookmarks();
    },
  });

  const length = data?.list ? data.list.length : 0;
  const {
    startPage,
    currentPage,
    indexOfFirstItem,
    indexOfLastItem,
    handleNextPageGroup,
    handlePrevPageGroup,
    handlePageClick,
    totalPages,
    pagesToShow,
  } = usePagination(length);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  if (data?.list?.length === 0) return <div>등록한 북마크가 없습니다.</div>;

  // const handleDeleteBookmark = () => {};

  const dataToShow = data?.list.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <h1 className="font-bold text-2xl my-5 mt-10 text-center">나의 북마크</h1>
      <ul>
        {dataToShow.map((bm: Bookmark) => (
          <li
            key={bm.id}
            className="flex border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
          >
            <Link to={`/post/${bm.postInfo.Id}`} className="flex ">
              <div className="flex flex-col justify-center gap-2">
                <div className="">
                  {/* <StatusBadge status={post.status} /> */}
                  <h2 className="font-bold">{bm.postInfo.title}</h2>
                </div>
                <p className="text-sm">{bm.postInfo.content}</p>
              </div>
            </Link>
            <button className="ml-auto">
              <Cross1Icon />
            </button>
          </li>
        ))}
      </ul>
      <PaginationSection
        currentPage={currentPage}
        startPage={startPage}
        pagesToShow={pagesToShow}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        handlePrevPageGroup={handlePrevPageGroup}
        handleNextPageGroup={handleNextPageGroup}
      />
    </>
  );
}
