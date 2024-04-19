import { type Status } from '@/lib/types';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  variant?: 'detail';
  status: Status;
  classNames?: string;
};

export default function StatusBadge({ variant, status, classNames }: StatusBadgeProps) {
  return (
    <p
      className={cn(
        'border px-1 py-[1px] rounded-full text-sm w-fit',
        classNames,
        { 'px-2 py-1': variant === 'detail' },
        {
          'border-primary text-primary': status === 'in_progress',
        },
        { 'border-light-gray bg-light-gray text-white': status === 'completed' },
        { 'border-destructive text-destructive': status === 'failed' },
      )}
    >
      {status === 'in_progress' && '모집중'}
      {status === 'completed' && '모집완료'}
      {status === 'failed' && '모집실패'}
    </p>
  );
}
