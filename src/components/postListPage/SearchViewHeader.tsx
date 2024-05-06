import { Button } from '../ui/button';
import { SymbolIcon } from '@radix-ui/react-icons';

type SearchViewHeaderProps = {
  searchKeyword: string;
  onClick: () => void;
  searchResultCount: number;
};

export default function SearchViewHeader({ searchKeyword, onClick, searchResultCount }: SearchViewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex ml-4">
        <b className="font-extrabold text-primary">{searchKeyword}</b>에 대한{' '}
        <p className="ml-1 "> {searchResultCount}</p> 개의 검색결과가 있습니다.
      </div>
      <Button variant="outline" onClick={onClick}>
        <SymbolIcon />
      </Button>
    </div>
  );
}
