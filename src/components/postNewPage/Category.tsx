import { CATEGORIES } from '@/lib/data';
import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface CategoryProps {
  onSelectCategory: (category: string) => void;
}

export default function Category({ onSelectCategory }: CategoryProps) {
  // 카테고리 오픈
  const [openCategory, setOpenCategory] = useState(false);

  // 카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState('');

  // 카테고리 리스트 토글
  const [toggle, setToggle] = useState<boolean>(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenCategory(!openCategory);
    setToggle(true);
  };

  const handleCategoryClick = (category: string) => {
    setOpenCategory(false);
    setSelectedCategory(category);
    setToggle(false);
    onSelectCategory(category);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b relative">
      <button type="button" onClick={handleButtonClick} className="font-semibold w-11/12 text-left">
        {selectedCategory || '카테고리'}
      </button>
      {toggle ? (
        <button type="button">
          <RiArrowUpSLine className="w-6 h-6" />
        </button>
      ) : (
        <button type="button">
          <RiArrowDownSLine className="w-6 h-6" />
        </button>
      )}
      {toggle && (
        <div className="w-full absolute left-0 top-[57px] bg-white border-x rounded-b-2xl border-b pb-2.5 z-10">
          {CATEGORIES.filter(category => category.type !== 'ALL').map(category => (
            <button
              key={category.type}
              onClick={() => handleCategoryClick(category.name)}
              className="w-full py-4 px-2.5 hover:bg-slate-100 text-left"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
