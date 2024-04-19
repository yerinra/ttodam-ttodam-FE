import { deleteBookmark, getBookmarks } from '@/apis/myPage/bookmark';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import usePagination from '@/hooks/usePagination';
import PaginationSection from '@/components/postListPage/PaginationSection';

import { type Bookmark } from '@/mocks/mockData/mypage/bookmarks';
import PostPreview from '@/components/postListPage/PostPreview';
import H1 from '@/components/atoms/H1';

export default function BookMarkPage() {
  const { data, error, isLoading } = useQuery<Bookmark[]>({
    queryKey: ['bookmarks'],
    queryFn: () => {
      return getBookmarks();
    },
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

  const useDeleteBookmarkMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
      onMutate: (deletedBookmarkId: number) => {
        const previousData = queryClient.getQueryData<Bookmark[]>(['bookmarks']);
        queryClient.setQueryData(['bookmarks'], previousData => {
          return (previousData as Bookmark[])?.filter((item: Bookmark) => item.id !== deletedBookmarkId) || [];
        });
        return { previousData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      },
      onError: () => {
        console.log('error!');
      },
    });
  };

  const { mutateAsync } = useDeleteBookmarkMutation();
  const handleDeleteBookmark = async (bookmarkId: number) => {
    try {
      await mutateAsync(bookmarkId);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  if (data?.length === 0) return <div>등록한 북마크가 없습니다.</div>;

  const dataToShow = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <H1>나의 북마크</H1>
      <ul>
        {dataToShow &&
          dataToShow.map((bm: Bookmark) => (
            <PostPreview key={bm.id} post={bm.postInfo} removeBtn onDelete={() => handleDeleteBookmark(bm.id)} />
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
