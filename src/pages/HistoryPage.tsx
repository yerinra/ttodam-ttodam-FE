import HistoryList from '@/components/historyPage/HistoryList';

export default function HistoryPage() {
  return (
    <section className="flex justify-center items-center flex-col mt-8">
      <h1 className="font-bold text-3xl">참여내역</h1>
      <HistoryList />
    </section>
  );
}
