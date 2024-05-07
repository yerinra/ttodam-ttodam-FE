import { Button } from '../ui/button';

type ProfileImageProps = {
  profileImgSrc: string | undefined;
  onError: (e: React.ChangeEvent<HTMLImageElement>) => void;
  onImgSubmit: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onInputChange: () => void;
  profileImgFileInput: React.RefObject<HTMLInputElement>;
};

export default function ProfileImage({
  profileImgSrc,
  onError,
  onImgSubmit,
  onInputChange,
  profileImgFileInput,
}: ProfileImageProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <img
          src={profileImgSrc}
          alt="프로필 이미지"
          onError={onError}
          className="flex items-center justify-center w-[100px] h-[100px] border rounded-[50%]"
        />
      </div>
      <Button variant="secondary" onClick={onInputChange}>
        사진변경
      </Button>
      <input
        type="file"
        id="edit-image"
        accept="'image/*"
        onChange={onImgSubmit}
        ref={profileImgFileInput}
        name="profileImgUrl"
        className="hidden"
      />
    </div>
  );
}
