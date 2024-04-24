import { deleteBookmark, getBookmarks } from '@/apis/myPage/bookmark';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import usePagination from '@/hooks/usePagination';
import PaginationSection from '@/components/postListPage/PaginationSection';

import PostPreview from '@/components/postListPage/PostPreview';
import H1 from '@/components/atoms/H1';
import { type BookMark } from '@/types/bookmark';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function BookMarkPage() {
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

  const useDeleteBookmarkMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
      onMutate: (deletedBookmarkId: number) => {
        const previousData = queryClient.getQueryData<BookMark[]>(['bookmarks']);
        queryClient.setQueryData(['bookmarks'], (previousData: BookMark[]) => {
          return previousData.filter((item: BookMark) => item.id !== deletedBookmarkId) || [];
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
    const confirmed = window.confirm('북마크를 삭제하시겠습니까?');

    if (confirmed) {
      try {
        await mutateAsync(bookmarkId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  if (data?.length == 0)
    return (
      <>
        <H1>나의 북마크</H1>
        <div className="pt-10 w-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-center">등록된 북마크가 없습니다. </div>
          <Button>
            <Link to="/posts/all">게시판으로 가기</Link>
          </Button>
        </div>
      </>
    );

  const dataToShow = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <H1>나의 북마크</H1>
      <div className="flex ml-4 mb-3">
        총 <p className="text-primary ml-1">{data?.length}</p>개의 북마크가 있습니다.
      </div>
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
