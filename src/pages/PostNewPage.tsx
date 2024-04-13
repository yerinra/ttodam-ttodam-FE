import { FaLongArrowAltLeft } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/data';
import React, { useState } from 'react';
import { DatePicker } from '@/components/atoms/DatePicker';
import DaumPost from '@/components/atoms/DaumPost';

export default function PostNewPage() {
  // 카테고리 오픈
  const [openCategory, setOpenCategory] = useState(false);

  // 카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState('');

  // 카테고리 리스트 토글
  const [toggle, setToggle] = useState<boolean>(false);

  const [products, setProducts] = useState<
    {
      productName: string;
      purchaseLink: string;
      price: number;
      count: number;
      productImgUrl: string;
      participants: number;
    }[]
  >([
    {
      productName: '',
      purchaseLink: '',
      price: 0,
      count: 0,
      productImgUrl: '',
      participants: 0,
    },
  ]);

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

  /**
   * 새로운 입력 필드 추가
   * 새로운 입력 필드가 추가될 때 호출되며, 새로운 상품 객체를 기존 상품 리스트에 추가함.
   * 새로운 상품 객체의 기본 값은 빈문자열('')로 설정.
   * price와 count 필드는 parseInt('')를 통해 초기화되며,
   * 이는 새로운 입력 필드가 추가되었을 때 1이 표지되지 않도록 하기 위함.
   * productImgUrl 초기값으로 설정.
   */
  const handleAddProducts = () => {
    setProducts([
      ...products,
      {
        productName: '',
        purchaseLink: '',
        price: parseInt(''),
        count: parseInt(''),
        productImgUrl: '',
        participants: parseInt(''),
      },
    ]);
  };

  // 입력 필드 삭제
  const handleRemoveProducts = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  // 상품 이름 변경
  const handleProductNameChange = (index: number, value: string) => {
    const newProducts = [...products];
    newProducts[index].productName = value;
    setProducts(newProducts);
  };

  // 상품 링크 변경
  const handleProductLinkChange = (index: number, value: string) => {
    const newProducts = [...products];
    newProducts[index].purchaseLink = value;
    setProducts(newProducts);
    // fetchProductImage(index, value);
  };

  /**
   * 상품 수량 변경
   * @param index 해당 상품의 인덱스
   * @param value 입력된 값 (문자열)
   * 문자열인 value를 숫자로 변환하여 상품의 수량을 업데이트
   * 만약 입력된 값이 숫자가 아닌 경우, 빈 문자열로 설정하여 입력을 유도
   */
  const handleProductCountChange = (index: number, value: string) => {
    // 입력된 값이 숫자인지 확인하고, 숫자가 아니면 빈 문자열로 설정
    const newValue = isNaN(parseInt(value)) ? '' : value;
    const newProducts = [...products];

    // 상품의 수량 업데이트
    newProducts[index].count = parseInt(newValue);
    setProducts(newProducts);
  };

  /**
   * 상품 기존 가격 변경
   * @param index 해당 상품의 인덱스
   * @param value 입력된 값 (문자열)
   * 문자열인 value를 숫자로 변환하여 상품의 가격을 업데이트
   * 만약 입력된 값이 숫자가 아닌 경우, 빈 문자열로 설정하여 입력을 유도
   */
  const handleProductPriceChange = (index: number, value: string) => {
    // 입력된 값이 숫자인지 확인하고, 숫자가 아니면 빈 문자열로 설정
    const newValue = value.trim() === '' ? '0' : value;
    const newProducts = [...products];

    // 상품의 가격 업데이트
    newProducts[index].price = parseInt(newValue);
    setProducts(newProducts);
  };

  /**
   * 희망 모집 인원 변경
   * @param index 해당 상품의 인덱스
   * @param value 입력된 값 (문자열)
   * 문자열인 value를 숫자로 변환하여 희망 모집 인원 업데이트
   * 만약 입력된 값이 숫자가 아닌 경우, 빈 문자열로 설정하여 입력을 유도
   */
  const handleParticipantsChange = (index: number, value: string) => {
    const newValue = isNaN(parseInt(value)) ? '' : value;
    const newProducts = [...products];

    newProducts[index].participants = parseInt(newValue);
    setProducts(newProducts);
  };

  /**
   * 인당 가격 계산 함수
   * @param price 원래 가격
   * @param participants 모집 인원
   * 참여자 수가 0이면 빈 문자열을 반환
   * 가격을 참여자 수로 나누어 인당 가격 계산
   * 인당 가격이 숫자가 아니면 빈 문자열 반환
   */
  const calculatePerPersonPrice = (price: number, participants: number): string => {
    if (participants === 0) return '';
    const perPersonPrice = price / participants;
    return isNaN(perPersonPrice) ? '' : String(perPersonPrice) + '원';
  };

  return (
    <section className="px-5 w-full">
      <div className="flex items-center justify-between border-b border-black h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link to="/posts/all">
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
          {products.map((product, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-4 border-b text-black">
                <input
                  type="text"
                  placeholder="상품 이름"
                  value={product.productName}
                  onChange={e => handleProductNameChange(index, e.target.value)}
                  className="w-full outline-none"
                />
                {index === products.length - 1 ? (
                  <button type="button" onClick={handleAddProducts}>
                    <FaPlus className="w-3 h-3 mr-1" />
                  </button>
                ) : (
                  <button type="button" onClick={() => handleRemoveProducts(index)}>
                    <FaMinus className="w-3 h-3 mr-1" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between py-4 border-b text-black">
                <input
                  type="text"
                  placeholder="상품 링크"
                  value={product.purchaseLink}
                  onChange={e => handleProductLinkChange(index, e.target.value)}
                  className="w-full outline-none"
                />
              </div>
              <div className="flex items-center justify-between py-4 border-b text-black">
                <input
                  type="number"
                  placeholder="수량"
                  value={product.count === 0 ? '' : String(product.count)}
                  onChange={e => handleProductCountChange(index, e.target.value)}
                  className="w-full outline-none"
                />
              </div>
              <div className="flex items-center justify-between py-4 border-b text-black">
                <input
                  type="number"
                  placeholder="원래 가격"
                  value={product.price === 0 ? '' : String(product.price)}
                  onChange={e => handleProductPriceChange(index, e.target.value)}
                  className="w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          ))}
          {products.map((product, index) => (
            <input
              type="text"
              key={index}
              placeholder="인당 가격"
              value={calculatePerPersonPrice(product.price, product.participants)}
              readOnly
              className="w-full outline-none py-4 border-b"
            />
          ))}
          <DaumPost />
          {products.map((product, index) => (
            <input
              type="number"
              key={index}
              placeholder="희망 모집 인원"
              value={product.participants === 0 ? '' : String(product.participants)}
              onChange={e => handleParticipantsChange(index, e.target.value)}
              className="w-full outline-none py-4 border-b [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          ))}
          <div className="w-full border-b py-4">
            <DatePicker />
          </div>
          <textarea
            cols={30}
            rows={10}
            placeholder="상세 정보"
            className="w-full outline-none py-4 border-b resize-none"
          ></textarea>
        </form>
        <div className="flex w-full py-4 border-b">
          <p className="text-[#C4C4C4] font-semibold mr-4">사진</p>
          {products.map((product, index) => (
            <div key={index} className="flex justify-center mr-3">
              {product.productImgUrl ? (
                <img src={product.productImgUrl} alt={product.productName} className="w-[53px] h-[53px] border" />
              ) : (
                <div className="flex items-center justify-center w-[53px] h-[53px] border bg-gray-300">+</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
