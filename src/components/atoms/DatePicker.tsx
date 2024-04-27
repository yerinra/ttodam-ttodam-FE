import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      onDateChange(date);
    }
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal border-none outline-none px-0 bg-white shadow-none hover:bg-inherit',
            !date && 'text-muted-foreground',
          )}
        >
          {date ? format(date, 'yyyy-MM-dd') : <span className=" text-base text-[#9ca3af]">마감일</span>}
          <CalendarIcon className="mr-2 h-4 w-4 ml-1 text-[#9ca3af]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" locale={ko} selected={date} onSelect={handleDateSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
