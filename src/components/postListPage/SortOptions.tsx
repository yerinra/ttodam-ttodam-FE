import { SORT_OPTIONS } from '@/lib/data';
import { OptionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DotFilledIcon } from '@radix-ui/react-icons';

type SortOptionsProps = {
  selectedSort: OptionType;
  handleSortOptionClick: (type: OptionType) => void;
};

export default function SortOptions({ selectedSort, handleSortOptionClick }: SortOptionsProps) {
  return (
    <ul className="flex gap-2 text-sm">
      {SORT_OPTIONS.map(option => (
        <li key={option.type}>
          <button
            className={cn('flex items-center', {
              'text-light-gray hover:text-dark-gray': option.type !== selectedSort,
            })}
            onClick={() => handleSortOptionClick(option.type)}
          >
            <DotFilledIcon className={cn({ 'text-primary': option.type == selectedSort })} />
            {option.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
