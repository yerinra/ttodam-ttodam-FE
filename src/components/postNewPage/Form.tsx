import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { DatePicker } from "../atoms/DatePicker";
import { format } from 'date-fns';
import DaumPost from "../atoms/DaumPost";
import { PostNew } from "@/lib/types";
import Category from "./Category";

export default function Form() {
  const [products, setProducts] = useState<PostNew[]>([
    {
      title: '',
      deadline: '',
      participants: 0,
      place: '',
      productName: '',
      price: 0,
      count: 0,
      purchaseLink: '',
      productImgUrl: '',
      content: '',
      category: "ALL"
    },
  ]);

  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalParticipants, setTotalParticipants] = useState('');
  const [content, setContent] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [deadline, setDeadline] = useState<Date>(new Date());

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  }

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
        price: 0,
        count: parseInt(''),
        productImgUrl: '',
        participants: parseInt(''),
        title: '',
        deadline: '',
        place: '',
        content: '',
        category: "ALL"
      },
    ]);
  };

  // 입력 필드 삭제
  const handleRemoveProducts = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  // 게시글 변경
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

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
    const newValue = value.trim() === '' ? '0' : value.replaceAll(',', '');
  
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
  const handleParticipantsChangeAllProducts = (value: string) => {
    const newProducts = products.map(product => {
      return { ...product, participants: parseInt(value) };
    });
    setProducts(newProducts);
    setTotalParticipants(value);
  };

  /**
   * 인당 가격 계산 함수
   * @param price 원래 가격
   * @param participants 모집 인원
   * 참여자 수가 0이면 빈 문자열을 반환
   * 가격을 참여자 수로 나누어 인당 가격 계산
   * 인당 가격이 숫자가 아니면 빈 문자열 반환
   */
  const calculatePerPersonPrice = ({price, participants}: PostNew): string => {
    if (participants === 0) return '';
    const perPersonPrice = price / participants;
    return isNaN(perPersonPrice) ? '' : (perPersonPrice).toLocaleString() + '원';
  };

  // 주소 변경
  const handleAddressChange = (address: string) => {
    setSelectedAddress(address)
  }

  // 날짜 선택
  const handleDateSelect = (selectedDate: Date) => {
    // 선택된 날짜를 상태에 업데이트
    setDeadline(selectedDate);
  };

  // 상세정보 변경
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 기본 폼 데이터 
    const product = products[0];
    // const { title, selectedAddress, content, selectedCategory, participants } = products;
    const formattedDeadline = deadline ? format(new Date(deadline), 'yyyy-MM-dd HH:mm:ss') : '';

    // 추가된 상품 데이터만 포함하는 배열
    const addedProductsData = products.map(product => ({
      productName: product.productName,
      purchaseLink: product.purchaseLink,
      count: product.count,
      price: product.price,
      productImgUrl: product.productImgUrl
    }));

    // 추가된 상품이 있는 경우, 해당 데이터를 포함하여 처리
    if (addedProductsData.length > 0) {
      // 추가된 상품 데이터와 나머지 폼 데이터를 포함한 얼럿 메세지
      alert(`title: ${title}, products: ${JSON.stringify(addedProductsData)}, place: ${selectedAddress}, content: ${content}, category: ${selectedCategory}`)
    } else {
      // 추가된 상품이 없는 경우, 기존 폼 데이터만 포함한 얼럿 메세지
      alert(`title: ${title}, name: ${product.productName}, link: ${product.purchaseLink}, count: ${product.count}, price: ${product.price}, participants: ${product.participants}, place: ${selectedAddress}, deadline: ${formattedDeadline}, content: ${content}, category: ${selectedCategory} productImgUrl: ${product.productImgUrl}`);
    }
  }
  
  // TODO: 'multipart/form-data' 사용해서 이미지 업로드하기
  const [imageFile, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file);

    const formData = new FormData();
    imageFile && formData.append('image', imageFile);
    console.log('formData', ...formData);

    if (file) {
      setImageFiles(file);
      
      const productImgUrl = URL.createObjectURL(file);
      setImagePreview(productImgUrl);
      console.log('productImgUrl', productImgUrl);
    };
    
  };

  // 메모리 누수 방지 - 이미지 업로드 후 Blob URL 해제
  useEffect(() => {
    if (imagePreview) {
      return () => URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

  return (
    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
      <input type="submit" value={'등록'} className="absolute right-0 top-0 py-0.5 px-3 bg-primary rounded-md text-white my-[15px] mr-5" />
      <Category onSelectCategory={handleCategorySelect} />
      <input type="text" placeholder="게시글 제목" value={title} onChange={handleTitleChange} className="w-full outline-none py-4 border-b" />
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
              type="text"
              placeholder="원래 가격"
              value={(product.price) === 0 ? '' : (product.price).toLocaleString()}
              onChange={e => handleProductPriceChange(index, e.target.value.replaceAll(',', ''))}
              className="w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />원
          </div>
          {index === products.length - 1 ? (
            <input
            type="text"
            key={index}
            placeholder="인당 가격"
            value={calculatePerPersonPrice(product)}
            readOnly
            className="w-full outline-none py-4 border-b"
            />
          ) : (
            <input
            type="text"
            key={index}
            placeholder="인당 가격"
            value={calculatePerPersonPrice(product)}
            readOnly
            className="w-full outline-none py-4 border-b-2 border-stone-300 text-black"
            />
          )}
        </div>
      ))}
      <DaumPost onAddressChange={handleAddressChange} />
      <input
        type="number"
        placeholder="희망 모집 인원"
        value={totalParticipants}
        onChange={e => handleParticipantsChangeAllProducts(e.target.value)}
        className="w-full outline-none py-4 border-b [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="w-full border-b py-4">
        <DatePicker onDateChange={handleDateSelect}  />
      </div>
      <textarea
        cols={30}
        rows={10}
        placeholder="상세 정보"
        name="content"
        value={content}
        onChange={handleContentChange}
        className="w-full outline-none py-4 border-b resize-none"
      />
      <div className="flex w-full py-4 border-b">
        <p className="text-[#C4C4C4] font-semibold mr-4">사진</p>
        {/* {products.map((product, index) => ( */}
          <div className="flex justify-center mr-3">
            {/* {product.productImgUrl ? (
              <img src={product.productImgUrl} alt={product.productName} className="w-[53px] h-[53px] border" />
              ) : (
              <div className="flex items-center justify-center w-[53px] h-[53px] border bg-gray-300">+</div>
            )} */}
            <img src={imagePreview} alt='상품이미지' />
            <input type="file" accept="'image/*" onChange={uploadImage} />
          </div>
        {/* ))} */}
      </div>
    </form>
  )
}