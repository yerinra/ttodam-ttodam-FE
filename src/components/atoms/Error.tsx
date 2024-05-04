import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[70vh] bg-red-100 border mt-5 border-red-500 rounded-md">
      <ExclamationTriangleIcon className="text-red-500 w-[40px] h-[40px]" />
      <div>에러가 발생했습니다.</div>
      <div>다시 시도해주세요.</div>
    </div>
  );
}
