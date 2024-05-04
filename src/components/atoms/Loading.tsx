import { UpdateIcon } from '@radix-ui/react-icons';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[70vh] bg-primary/10 border mt-5 border-primary rounded-md">
      {/* <ExclamationTriangleIcon className="text-red-500 w-[40px] h-[40px]" /> */}
      <UpdateIcon className="animate-spin w-[30px] h-[30px]" />

      <div className="font-semibold">로딩 중입니다...</div>
    </div>
  );
}
