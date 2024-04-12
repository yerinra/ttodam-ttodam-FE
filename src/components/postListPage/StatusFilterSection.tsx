import { STATUS } from '@/lib/data';
import { StatusFilter } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DotFilledIcon } from '@radix-ui/react-icons';

type StatusFilterSectionProps = {
  selectedFilter: StatusFilter;
  handleFilterSelect: React.Dispatch<React.SetStateAction<StatusFilter>>;
};

export default function StatusFilterSection({ selectedFilter, handleFilterSelect }: StatusFilterSectionProps) {
  return (
    <ul className="flex gap-2 text-sm">
      {STATUS.map(stat => (
        <li key={stat.type}>
          <button
            className={cn('flex items-center', {
              'text-light-gray hover:text-dark-gray': stat.type !== selectedFilter,
            })}
            onClick={() => handleFilterSelect(stat.type)}
          >
            <DotFilledIcon className={cn({ 'text-primary': stat.type == selectedFilter })} />
            {stat.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
