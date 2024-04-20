import { PostNew } from '@/lib/types';
import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function DaumPost({ onAddressChange }: { onAddressChange: (address: PostNew['place']) => void }) {
  // 주소, 모달 열림 여부, 상세 주소 상태 관리
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 주소 검색 완료 시 호출되는 콜백 함수
  const handleComplete = (data: { address: string }) => {
    const { address } = data;
    setIsOpen(false);
    setAddress(address);
    onAddressChange(address);

    // 데이터 확인
    console.log(data, 'data');
  };

  // 주소 검색 모달이 닫힐 때 호출되는 콜백 함수
  const handleClose = (state: string) => {
    // 모달이 강제로 닫힌 경우 또는 주소 선택 완료 후 모달 닫기
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
      console.log('FORCE_CLOSE');
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
      console.log('COMPLETE_CLOSE');
    }
  };

  // 모달 토글
  const toggleHandler = () => {
    setIsOpen(prevOpenState => !prevOpenState);
  };

  // 상세 주소 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={handleInputChange}
          readOnly
          className="w-[250px] outline-none"
        />
        <button
          type="button"
          onClick={toggleHandler}
          className="w-[90px] py-1 px-3 bg-primary border-none rounded-md text-white outline-0"
        >
          주소 찾기
        </button>
        {isOpen && (
          <div className="absolute left-0 top-full border">
            <DaumPostcode onComplete={handleComplete} onClose={handleClose} autoMapping />
          </div>
        )}
      </div>
    </div>
  );
}
