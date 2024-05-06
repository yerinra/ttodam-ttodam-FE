import React from 'react';
import CategorySelector from './CategorySelector';
import { Link } from 'react-router-dom';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import StatusFilterSection from './StatusFilterSection';
import SortOptions from './SortOptions';
import { Category, OptionType, Status } from '@/types/post';

type ListViewOptionsProps = {
  selectedCategory: Category;
  selectedFilter: Status | 'ALL';
  setSelectedFilter: React.Dispatch<React.SetStateAction<'ALL' | Status>>;
  selectedSort: 'title' | 'createdAt';
  handleSortOptionClick: (type: OptionType) => void;
};

export default function ListViewOptions({
  selectedCategory,
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  handleSortOptionClick,
}: ListViewOptionsProps) {
  return (
    <>
      <CategorySelector selectedCategory={selectedCategory as Category} />

      <section className="flex items-center justify-center mt-2 pt-2">
        <div className="flex flex-col gap-y-1">
          <StatusFilterSection selectedFilter={selectedFilter} handleFilterSelect={setSelectedFilter} />
          <SortOptions selectedSort={selectedSort} handleSortOptionClick={handleSortOptionClick} />
        </div>

        <Link to="/post/new" className="ml-auto">
          <Button className="gap-1 bg-slate-700 hover:bg-slate-600 transition-all">
            <Pencil2Icon />
            <p className="hidden md:inline">글쓰기</p>
          </Button>
        </Link>
      </section>
    </>
  );
}
