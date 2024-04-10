import { FaLongArrowAltLeft } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/data';
import React, { useState } from 'react';

export default function PostNewPage() {
  // 카테고리 오픈
  const [openCategory, setOpenCategory] = useState(false);

  // 카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState('');

  // 카테고리 리스트 토글
  const [toggle, setToggle] = useState<boolean>(false);

  const [productNames, setProductNames] = useState(['']);
  const [productLinks, setProductLinks] = useState(['']);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenCategory(!openCategory);
    setToggle(true);
  };

  const handleCategoryClick = (category: string) => {
    setOpenCategory(false);
    setSelectedCategory(category);
    setToggle(false);
  };

  // 새로운 입력 필드 추가
  const handleAddProducts = () => {
    setProductNames([...productNames, '']);
    setProductLinks([...productLinks, '']);
  };

  // 입력 필드 삭제
  const handleRemoveProducts = (index: number) => {
    // 상품 이름
    const newProductNames = [...productNames];
    newProductNames.splice(index, 1);
    setProductNames(newProductNames);

    // 상품 링크
    const newProductLinks = [...productLinks];
    newProductLinks.splice(index, 1);
    setProductLinks(newProductLinks);
  };

  const handleProductChange = (index: number, value: string) => {
    const newProductNames = [...productNames];

    // 해당 인덱스의 상품 이름 변경
    newProductNames[index] = value;
    setProductNames(newProductNames);

    const newProductLinks = [...productLinks];

    // 해당 인덱스의 상품 링크 변경
    newProductLinks[index] = value;
    setProductLinks(newProductLinks);
  };

  return (
    <section className="px-5">
      <div className="flex items-center justify-between border-b border-black h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link to="/post/:categoryName">
            <FaLongArrowAltLeft className="w-5 h-5" />
          </Link>
          <h3 className="font-semibold">모집글 쓰기</h3>
        </div>
        <button type="submit" className="py-0.5 px-3 bg-primary rounded-md text-white">
          등록
        </button>
      </div>
      <div>
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
            <ul className="w-full absolute left-0 top-[57px] bg-white border-x rounded-b-2xl border-b pb-2.5">
              {CATEGORIES.map(category => (
                <li
                  key={category.type}
                  onClick={() => handleCategoryClick(category.name)}
                  className="w-full py-4 px-2.5 hover:bg-slate-100"
                >
                  <button className="w-full text-left">{category.name}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form>
          <input type="text" placeholder="게시글 제목" className="w-full outline-none py-4 border-b" />
          {productNames.map((productName, index) => (
            <>
              <div key={index} className="flex items-center justify-between py-4 border-b text-black">
                <input
                  type="text"
                  placeholder="상품 이름"
                  value={productName}
                  onChange={e => handleProductChange(index, e.target.value)}
                  className="w-full outline-none"
                />
                {index === productNames.length - 1 ? (
                  <button type="button" onClick={handleAddProducts}>
                    <FaPlus className="w-3 h-3 mr-1" />
                  </button>
                ) : (
                  <button type="button" onClick={() => handleRemoveProducts(index)}>
                    <FaMinus className="w-3 h-3 mr-1" />
                  </button>
                )}
              </div>
              <div key={index} className="flex items-center justify-between py-4 border-b text-black">
                <input
                  type="text"
                  placeholder="상품 링크"
                  value={productName}
                  onChange={e => handleProductChange(index, e.target.value)}
                  className="w-full outline-none"
                />
                {index === productLinks.length - 1 ? (
                  <button type="button" onClick={handleAddProducts}>
                    <FaPlus className="w-3 h-3 mr-1" />
                  </button>
                ) : (
                  <button type="button" onClick={() => handleRemoveProducts(index)}>
                    <FaMinus className="w-3 h-3 mr-1" />
                  </button>
                )}
              </div>
            </>
          ))}
          <input type="text" placeholder="희망 거래 장소" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="희망 모집 인원" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="원래 가격" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="인당 가격" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="마감일" className="w-full outline-none py-4 border-b" />
          <textarea
            cols={30}
            rows={10}
            placeholder="상세 정보"
            className="w-full outline-none py-4 border-b resize-none"
          ></textarea>
        </form>
        <div className="flex gap-8 w-full py-4 border-b">
          <p className="text-[#C4C4C4] font-semibold">사진</p>
          <button type="button" className="w-[53px] h-[53px] border bg-gray-300">
            +
          </button>
        </div>
      </div>
    </section>
  );
}
