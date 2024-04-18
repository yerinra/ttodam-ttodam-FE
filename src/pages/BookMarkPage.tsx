import { getBookmarks } from '@/apis/myPage/bookmark';
import PostPreview from '@/components/postListPage/PostPreview';
import { BookMark } from '@/mocks/handlers/myPage/bookmark';
import { useQuery } from '@tanstack/react-query';
import { BookMark as TBookMark } from '@/mocks/handlers/myPage/bookmark';
import { Link } from 'react-router-dom';
import usePagination from '@/hooks/usePagination';
import PaginationSection from '@/components/postListPage/PaginationSection';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function BookMarkPage() {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['bookmarks'],
  //   queryFn: () => {
  //     return getBookmarks();
  //   },
  // });

  // if (isLoading) return <div>loading...</div>;
  // if (error) return <div>에러가 발생했습니다.</div>;

  // if (data?.list?.length === 0) return <div>등록한 북마크가 없습니다.</div>;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const {
    startPage,
    // setStartPage,
    currentPage,
    // setCurrentPage,
    indexOfFirstItem,
    indexOfLastItem,
    handleNextPageGroup,
    handlePrevPageGroup,
    handlePageClick,
    totalPages,
    pagesToShow,
  } = usePagination(data.length);

  const dataToShow = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <h1 className="font-bold text-2xl my-5 mt-10 text-center">나의 북마크</h1>
      <ul>
        {dataToShow.map((bm, index) => (
          <li
            key={index}
            className="flex border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
          >
            <Link to={`/post/${index + 2}`} className="flex ">
              <div className="flex flex-col justify-center gap-2">
                <div className="">
                  {/* <StatusBadge status={post.status} /> */}
                  <h2 className="font-bold">북마크 {bm}</h2>
                </div>
                <p className="text-sm">북마크 {bm} 내용입니다.</p>
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
