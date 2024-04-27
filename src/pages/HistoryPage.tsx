import { useQuery } from '@tanstack/react-query';

import usePagination from '@/hooks/usePagination';
import PaginationSection from '@/components/postListPage/PaginationSection';

import H1 from '@/components/atoms/H1';
import { getHistory } from '@/apis/myPage/history';
import { type History } from '@/mocks/mockData/mypage/history';
import HistoryPreview from '@/components/historyPage/HistoryPreview';

export default function HistoryPage() {
  const { data, error, isLoading } = useQuery<History[]>({
    queryKey: ['activities'],
    queryFn: () => {
      return getHistory();
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

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  if (data?.length === 0) return <div>참여하신 내역이 없습니다.</div>;

  const dataToShow = data?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <H1>참여 내역</H1>
      <ul>{dataToShow && dataToShow.map((ht: History) => <HistoryPreview key={ht.id} post={ht.postInfo} />)}</ul>
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
