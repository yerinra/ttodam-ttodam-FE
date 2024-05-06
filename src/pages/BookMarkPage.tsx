import { getBookmarks } from '@/apis/myPage/bookmark';
import { useQuery } from '@tanstack/react-query';

import usePagination from '@/hooks/usePagination';
import PaginationSection from '@/components/postListPage/PaginationSection';

import PostPreview from '@/components/postListPage/PostPreview';
import H1 from '@/components/atoms/H1';
import { type BookMark } from '@/types/bookmark';
import useRequireLogin from '@/hooks/useRequireLogin';
import Loading from '@/components/atoms/Loading';
import Error from '@/components/atoms/Error';
import { useDeleteBookmarkMutation } from '@/hooks/queries/useDeleteBookmarkMutation';
import NoBookmark from '@/components/bookmarkPage/NoBookmark';
import BookmarkCount from '@/components/bookmarkPage/BookmarkCount';

export default function BookMarkPage() {
  useRequireLogin();
  const { data, error, isLoading } = useQuery<BookMark[]>({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  });

  const dataLength = data ? data?.length : 0;

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
  } = usePagination(dataLength);

  const { mutateAsync } = useDeleteBookmarkMutation(false);
  const handleDeleteBookmark = async (bookmarkId: number) => {
    const confirmed = window.confirm('북마크를 삭제하시겠습니까?');

    if (confirmed) {
      try {
        await mutateAsync(bookmarkId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  if (data?.length == 0) return <NoBookmark />;

  const dataToShow = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <H1>나의 북마크</H1>
      <BookmarkCount bookmarkCount={data?.length || 0} />
      <ul>
        {dataToShow &&
          dataToShow.map((bm: BookMark) => (
            <PostPreview
              key={bm.id}
              removeBtn
              onDelete={() => handleDeleteBookmark(bm.id)}
              bookmarkId={bm.id}
              title={bm.postTitle}
              postId={bm.postId}
              status={bm.postStatus}
              products={bm.products}
            />
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
