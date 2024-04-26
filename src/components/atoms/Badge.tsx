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
          'border border-primary text-primary': variant === 'in_progress',
        },
        { 'border border-light-gray bg-light-gray text-white': variant === 'completed' },
        { 'border border-destructive text-destructive': variant === 'failed' },
        { 'bg-primary/20 px-1 py-[2px] text-primary rounded-md font-semibold': variant === 'primary' },
        { 'px-[6px] py-[2px] bg-slate-200 rounded-sm': variant === 'secondary' },
        classNames,
      )}
    >
      {variant === 'in_progress' && '모집중'}
      {variant === 'failed' && '모집실패'}
      {variant === 'completed' && '모집완료'}
      {children}
    </div>
  );
}
