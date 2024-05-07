import { PostNew } from '@/types/post';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Button } from '../ui/button';
import { UseFormSetValue } from 'react-hook-form';
import { editProfileFormValues } from '../editProfilePage/EditProfileForm';

type DaumPostProps = {
  setValue: UseFormSetValue<editProfileFormValues>;
  onAddressChange: (address: PostNew['place']) => void;
};

export default function DaumPost({ setValue, onAddressChange }: DaumPostProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: { address: string }) => {
    setIsOpen(false);
    setValue('location', data.address);
    onAddressChange(data.address);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setIsOpen(prevOpenState => !prevOpenState);
  };

  return (
    <div>
      <div className="relative">
        <input type="text" placeholder="주소" readOnly className="w-[250px] outline-none" />
        <Button type="button" onClick={toggleHandler} variant="secondary">
          주소 찾기
        </Button>
        {isOpen && (
          <div className="absolute left-0 top-full border">
            <DaumPostcode onComplete={handleComplete} onClose={handleClose} autoMapping />
          </div>
        )}
      </div>
    </div>
  );
}
