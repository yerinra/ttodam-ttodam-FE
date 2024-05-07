import { getEditProfiles, putEditProfiles, updateProfileImage } from '@/apis/myPage/profiles';
import { useQuery } from '@tanstack/react-query';
import user from '@/assets/user.png';
import { useRef, useState } from 'react';
import DaumPost from '../profilePage/DaumPost';
import { useNavigate } from 'react-router-dom';
import { EditProfileToSend, EditProfile } from '@/types/profile';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import Loading from '../atoms/Loading';
import Error from '../atoms/Error';
import ErrorMessage from './ErrorMessage';
import ProfileImage from '../profilePage/ProfileImage';

export type editProfileFormValues = {
  nickname: string;
  password: string;
  confirmPassword: string;
  location: string;
  phone: string;
};

export default function EditProfileForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<editProfileFormValues>();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<EditProfile>({
    queryKey: ['profiles/update'],
    queryFn: () => {
      return getEditProfiles();
    },
  });
  const [location, setLocation] = useState(profile?.location || '');
  const [, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(profile?.profileImgUrl);
  const navigate = useNavigate();
  const profileImgFileInput = useRef<HTMLInputElement>(null);
  const handleAddressChange = (address: string) => {
    setLocation(address);
  };

  const onSubmit = async (data: EditProfileToSend) => {
    if (!location) {
      alert('주소를 입력해야합니다.');
      return;
    }

    try {
      const dataToSend: EditProfileToSend = {
        nickname: data.nickname,
        password: data.password,
        confirmPassword: data.confirmPassword,
        location,
        phone: data.phone,
      };
      await putEditProfiles(dataToSend);
      alert('프로필 수정이 완료되었습니다.');
      navigate('/my/profile');
    } catch (error) {
      console.error('에러 발생: ', error);
      alert('프로필 수정에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    if (file) {
      const profileImgUrl = URL.createObjectURL(file);
      setImageFiles(file);
      setImagePreview(profileImgUrl);
      formData.append('profileImage', file);
      await updateProfileImage(formData);
    }
  };

  const handleImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
    alert('이미지만 등록할 수 있습니다.');
    e.target.src = user;
    return;
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {profile && (
        <ProfileImage
          profileImgSrc={imagePreview || profile.profileImgUrl || user}
          onError={handleImageError}
          onInputChange={() => profileImgFileInput.current?.click()}
          onImgSubmit={handleImageChange}
          profileImgFileInput={profileImgFileInput}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        encType="multipart/form-data"
        className="flex items-center justify-center flex-col"
      >
        <Button type="submit" className="absolute right-0 top-0 py-0.5 px-3 my-[15px] mr-5" size="sm">
          완료
        </Button>

        {profile && (
          <div key={profile.nickname}>
            <div className="flex w-full items-center justify-center py-6"></div>
            <div className="w-full flex items-center gap-5 border-b">
              <p className="w-[100px] font-bold">닉네임</p>
              <input
                type="text"
                placeholder="닉네임"
                defaultValue={profile.nickname || '닉네임'}
                {...register('nickname', {
                  required: '닉네임을 입력해주세요.',
                  minLength: { value: 2, message: '닉네임은 2글자 이상 입력해주세요.' },
                  maxLength: { value: 8, message: '닉네임은 8글자 이하로 입력해주세요.' },
                })}
                className="w-[250px] outline-none py-4 "
              />
            </div>
            {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호 입력"
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: { value: 8, message: '비밀번호는 8글자 이상 입력해주세요.' },
                  maxLength: { value: 16, message: '비밀번호는 16글자 이하로 입력해주세요.' },
                })}
                className="w-[250px] outline-none"
              />
            </div>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호 확인</p>
              <input
                type="password"
                placeholder="비밀번호 확인"
                {...register('confirmPassword', {
                  required: '비밀번호를 한 번 더 입력해주세요.',
                  validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
                className="w-[250px] outline-none"
              />
            </div>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">주소</p>
              <DaumPost onAddressChange={handleAddressChange} setValue={setValue} />
            </div>
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">전화번호</p>
              <input
                type="text"
                placeholder="전화번호 입력"
                defaultValue={profile.phonenumber}
                {...register('phone', {
                  required: '전화번호를 입력해주세요.',
                  pattern: {
                    value: /^(010)\d{8}$/,
                    message: '올바른 전화번호 형식을 입력해주세요. (010으로 시작하는 11자리 숫자)',
                  },
                })}
                className="w-[250px] outline-none"
              />
            </div>
            {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          </div>
        )}
      </form>
    </>
  );
}
