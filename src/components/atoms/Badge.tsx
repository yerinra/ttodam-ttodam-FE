import { type Status } from '@/types/post';
import { cn } from '@/lib/utils';
import React from 'react';

type BadgeProps = {
  size?: 'lg';
  variant?: 'primary' | 'secondary' | Status;
  classNames?: string;
  children?: React.ReactNode;
};

export default function Badge({ size, variant, classNames, children }: BadgeProps) {
  return (
    <div
      className={cn(
        'px-1 py-[1px] rounded-full text-sm w-fit h-fit',

        { 'px-2 py-1': size === 'lg' },
        {
          'border border-primary text-primary': variant === 'IN_PROGRESS',
        },
        { 'border border-light-gray bg-light-gray text-white': variant === 'COMPLETED' },
        { 'border border-destructive text-destructive': variant === 'FAILED' },
        { 'bg-primary/20 px-1 py-[2px] text-primary rounded-md font-semibold': variant === 'primary' },
        { 'px-[6px] py-[2px] bg-slate-200 rounded-sm': variant === 'secondary' },
        classNames,
      )}
    >
      {variant === 'IN_PROGRESS' && '모집중'}
      {variant === 'FAILED' && '모집실패'}
      {variant === 'COMPLETED' && '모집완료'}
      {children}
    </div>
  );
}
