import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function DaumPost() {
  // 주소, 모달 열림 여부, 상세 주소 상태 관리
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailedAddress, setDetailedAddress] = useState('');

  // 주소 검색 완료 시 호출되는 콜백 함수
  const handleComplete = (data: { address: string }) => {
    const { address } = data;
    setAddress(address);

    // 데이터 확인
    console.log(data, 'data');
  };

  // 주소 검색 모달이 닫힐 때 호출되는 콜백 함수
  const handleClose = (state: string) => {
    // 모달이 강제로 닫힌 경우 또는 주소 선택 완료 후 모달 닫기
    if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  // 모달 토글
  const toggleHandler = () => {
    setIsOpen(prevOpenState => !prevOpenState);
  };

  // 상세 주소 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full relative border-b">
        <input
          type="text"
          placeholder="희망 거래 주소"
          value={address}
          onChange={handleInputChange}
          readOnly
          className="w-2/4 outline-none py-4"
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
            <DaumPostcode onComplete={handleComplete} onClose={handleClose} />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="상세 장소"
        value={detailedAddress}
        onChange={handleInputChange}
        className="w-full outline-none py-4 border-b"
      />
    </div>
  );
}
