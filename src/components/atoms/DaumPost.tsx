import { ChangeEvent, RefObject, forwardRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type DaumPostProps = {
  onChange: (value: string) => void;
  defaultAddress?: string;
  forwardedRef?: RefObject<HTMLInputElement> | ((instance: HTMLInputElement | null) => void) | null;
};

const DaumPost = forwardRef<HTMLInputElement, DaumPostProps>(({ onChange, defaultAddress }, forwardedRef) => {
  // 주소, 모달 열림 여부, 상세 주소 상태 관리
  const [address, setAddress] = useState(defaultAddress);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 주소 검색 완료 시 호출되는 콜백 함수
  const handleComplete = (data: { address: string }) => {
    const { address } = data;
    setIsOpen(false);
    setAddress(address);
    onChange(address);
  };

  // 주소 검색 모달이 닫힐 때 호출되는 콜백 함수
  const handleClose = (state: string) => {
    // 모달이 강제로 닫힌 경우 또는 주소 선택 완료 후 모달 닫기
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
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
    <div className="flex items-center justify-between w-full relative gap-2">
      <Input
        type="text"
        ref={forwardedRef}
        placeholder="희망 거래 주소를 선택해주세요."
        value={address}
        onChange={handleInputChange}
        readOnly
      />
      <Button type="button" onClick={toggleHandler} variant="secondary">
        주소 찾기
      </Button>
      {isOpen && (
        <div className="absolute left-0 top-full w-full border z-[100]">
          <DaumPostcode onComplete={handleComplete} onClose={handleClose} autoMapping />
        </div>
      )}
    </div>
  );
});

DaumPost.displayName = 'DaumPost';
export default DaumPost;
