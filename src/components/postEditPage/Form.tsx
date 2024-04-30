import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../atoms/DatePicker';
import { format } from 'date-fns';
import DaumPost from '../atoms/DaumPost';
import { PostNew, type Post } from '@/types/post';
import { IoClose } from 'react-icons/io5';
import { useChangePostEditMutation } from '@/hooks/queries/useChangePostEditMutation';
import Category from '../postNewPage/Category';
// import { FaMinus, FaPlus } from 'react-icons/fa';

type FormProps = {
  data: Post;
};

// TODO: 컴포넌트 분리 및 리팩토링하기!
export default function Form({ data }: FormProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useChangePostEditMutation(+data.Id);

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
      postImgUrl: '',
      content: '',
      category: 'ALL',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState(data.title);
  const [totalParticipants, setTotalParticipants] = useState('');
  const [content, setContent] = useState(data.content);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [deadline, setDeadline] = useState<Date>(new Date(data.deadline));
  const [imageFile, setImageFiles] = useState<(File | null)[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategory(data.category);
    setTotalParticipants(String(data.participants));
    setSelectedAddress(data.place);
    setDeadline(new Date(data.deadline));
    setImagePreview(data.productImgUrl);

    if (data.products && data.products.length > 0) {
      const initialProducts = data.products.map(product => ({
        productName: product.productName || '',
        purchaseLink: product.purchaseLink || '',
        count: product.count || 0,
        price: product.price || 0,
      }));
      setProducts(initialProducts);
    }
  }, [data]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // const handleAddProducts = () => {
  //   setProducts([
  //     ...products,
  //     {
  //       productName: '',
  //       purchaseLink: '',
  //       price: 0,
  //       count: parseInt(''),
  //       postImgUrl: '',
  //       participants: parseInt(''),
  //       title: '',
  //       deadline: '',
  //       place: '',
  //       content: '',
  //       category: 'ALL',
  //     },
  //   ]);
  // };

  // // 입력 필드 삭제
  // const handleRemoveProducts = (index: number) => {
  //   const newProducts = [...products];
  //   newProducts.splice(index, 1);
  //   setProducts(newProducts);
  // };

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
  };

  // 상품 수량 변경
  const handleProductCountChange = (index: number, value: string) => {
    // 입력된 값이 숫자인지 확인하고, 숫자가 아니면 빈 문자열로 설정
    const newValue = isNaN(parseInt(value)) ? '' : value;
    const newProducts = [...products];

    // 상품의 수량 업데이트
    newProducts[index].count = parseInt(newValue);
    setProducts(newProducts);
  };

  // 상품 가격 업데이트
  const handleProductPriceChange = (index: number, value: string) => {
    // 입력된 값이 숫자인지 확인하고, 숫자가 아니면 빈 문자열로 설정
    const newValue = value.trim() === '' ? '0' : value.replaceAll(',', '');

    const newProducts = [...products];

    // 상품의 가격 업데이트
    newProducts[index].price = parseInt(newValue);
    setProducts(newProducts);
  };

  const handleParticipantsChangeAllProducts = (value: string) => {
    const newProducts = products.map(product => {
      return { ...product, participants: parseInt(value) };
    });
    setProducts(newProducts);
    setTotalParticipants(value);
  };

  // 주소 변경
  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };

  // 날짜 선택
  const handleDateSelect = (selectedDate: Date) => {
    // 선택된 날짜를 상태에 업데이트
    setDeadline(selectedDate);
  };

  // 상세정보 변경
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 1 * 1024 * 1024;
      console.log(maxSize);

      // 이미지 용량 제한
      if (file.size > maxSize) {
        alert(`1MB 이하의 사진만 등록할 수 있습니다.`);
        console.error('1MB 미만의 파일만 업로드 가능합니다.');
        return '';
      }

      const imageUrl = URL.createObjectURL(file);
      setImageFiles(prevFiles => [...prevFiles, file]);
      setImagePreview(prevPreviews => [...prevPreviews, imageUrl]);
    }
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    const newFiles = [...imageFile];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);

    const newPreviews = [...imagePreview];
    const removedPreview = newPreviews.splice(index, 1)[0];
    URL.revokeObjectURL(removedPreview);
    setImagePreview(newPreviews);

    const inputElement = document.getElementById('image-input') as HTMLInputElement | null;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const postId = data.Id;

    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('title', title);
    formData.append('deadline', format(new Date(deadline), 'yyyy-MM-dd HH:mm:ss'));
    formData.append('participants', totalParticipants);
    formData.append('place', selectedAddress);
    formData.append('content', content);

    products.forEach((product, index) => {
      formData.append(`products[${index}][productName]`, product.productName);
      formData.append(`products[${index}][price]`, product.price.toString());
      formData.append(`products[${index}][count]`, product.count.toString());
      formData.append(`products[${index}][purchaseLink]`, product.purchaseLink);
    });

    imageFile
      .filter(image => image !== null)
      .forEach((image, index) => {
        formData.append(`postImages[${index}]`, image!);
      });

    // 데이터 확인
    const formDataObject = Object.fromEntries(formData.entries());
    console.log('formDataObject', formDataObject);

    try {
      await mutateAsync({ postId, formData });
      alert('게시글 수정이 완료되었습니다.');
      console.log('요청이 성공적으로 완료되었습니다.');
      navigate('/posts/all');
    } catch (error) {
      console.log('요청을 보내는 중 오류가 발생하였습니다.', error);
    }

    imagePreview.forEach(URL.revokeObjectURL);
    setImageFiles([]);
    setImagePreview([]);
  };

  // 메모리 누수 방지 - 이미지 업로드 후 Blob URL 해제
  useEffect(() => {
    return () => {
      imagePreview.forEach(URL.revokeObjectURL);
    };
  }, [imagePreview]);

  return (
    <form onSubmit={handleSubmit} method="PUT" encType="multipart/form-data">
      <input
        type="submit"
        value={'등록'}
        className="absolute right-0 top-0 py-0.5 px-3 bg-primary rounded-md text-white my-[15px] mr-5"
      />
      <Category onSelectCategory={handleCategorySelect} />
      <input
        type="text"
        placeholder="게시글 제목을 입력해주세요."
        name={title}
        defaultValue={data.title}
        onChange={handleTitleChange}
        className="w-full outline-none py-4 border-b"
      />
      {data.products.map((product, index) => (
        <div key={index}>
          <div className="flex items-center justify-between py-4 border-b text-black">
            <input
              type="text"
              placeholder="상품의 이름을 입력해주세요."
              name={product.productName}
              defaultValue={product.productName}
              onChange={e => handleProductNameChange(index, e.target.value)}
              className="w-full outline-none"
            />
            {/* {index === products.length - 1 ? (
              <button type="button" onClick={handleAddProducts}>
                <FaPlus className="w-3 h-3 mr-1" />
              </button>
            ) : (
              <button type="button" onClick={() => handleRemoveProducts(index)}>
                <FaMinus className="w-3 h-3 mr-1" />
              </button>
            )} */}
          </div>
          <div className="flex items-center justify-between py-4 border-b text-black">
            <input
              type="text"
              placeholder="상품의 링크를 입력해주세요."
              name={product.purchaseLink}
              defaultValue={product.purchaseLink}
              onChange={e => handleProductLinkChange(index, e.target.value)}
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center justify-between py-4 border-b text-black">
            <input
              type="number"
              placeholder="상품의 수량을 입력해주세요."
              name={product.count === 0 ? '' : String(product.count)}
              defaultValue={product.count === 0 ? '' : String(product.count)}
              onChange={e => handleProductCountChange(index, e.target.value)}
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center justify-between py-4 border-b text-black">
            <input
              type="text"
              placeholder="상품의 가격을 입력해주세요."
              name={product.price === 0 ? '' : product.price.toLocaleString()}
              defaultValue={product.price === 0 ? '' : product.price.toLocaleString()}
              onChange={e => handleProductPriceChange(index, e.target.value.replaceAll(',', ''))}
              className="w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            원
          </div>
        </div>
      ))}
      <DaumPost onAddressChange={handleAddressChange} />
      <input
        type="number"
        placeholder="희망 모집 인원을 입력해주세요."
        name={totalParticipants}
        defaultValue={data.participants}
        onChange={e => handleParticipantsChangeAllProducts(e.target.value)}
        className="w-full outline-none py-4 border-b [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="w-full border-b py-4">
        <DatePicker onDateChange={handleDateSelect} />
      </div>
      <textarea
        cols={30}
        rows={10}
        placeholder="또담공구의 상세 정보를 입력해주세요."
        name={content}
        defaultValue={data.content}
        onChange={handleContentChange}
        className="w-full outline-none py-4 border-b resize-none"
      />
      <div className="flex w-full py-4 border-b h-40">
        <div className="flex justify-center mr-3 gap-3">
          <div>
            <div className="flex gap-3">
              <label
                htmlFor="post-image"
                className="w-[90px] h-8 flex items-center justify-center py-0.5 px-3 bg-primary rounded-md text-white cursor-pointer"
              >
                사진 추가
                <input
                  type="file"
                  id="post-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  className="hidden"
                />
              </label>
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`게시글 사진`} className="w-[100px] h-[100px] border" />
                  <button type="button" onClick={() => handleRemoveImage(index)} className="absolute right-1 top-1">
                    <IoClose className="w-5 h-5 bg-slate-300 border border-black" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
