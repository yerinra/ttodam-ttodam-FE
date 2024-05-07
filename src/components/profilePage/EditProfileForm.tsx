// import { getEditProfiles, putEditProfiles } from '@/apis/myPage/profiles';

// import { useMutation, useQuery } from '@tanstack/react-query';
// import user from '@/assets/user.png';
// import { useRef, useState } from 'react';
// import DaumPost from './DaumPost';
// import placeholderImage from '@/assets/placeholderImage.png';
// import { useNavigate } from 'react-router-dom';
// import { EditProfileToSend } from '@/types/profile';
// import { Button } from '../ui/button';
// import Loading from '../atoms/Loading';
// import Error from '../atoms/Error';

// // TODO: 컴포넌트 분리하기
// export default function EditProfileForm() {
//   const {
//     data: profile,
//     error,
//     isLoading,
//   } = useQuery<EditProfile>({
//     queryKey: ['profiles/update'],
//     queryFn: () => {
//       return getEditProfiles();
//     },
//   });
//   const navigate = useNavigate();
//   const profileImgFileInput = useRef(null);
//   const [imageFile, setImageFiles] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState(profile?.profileImgUrl);
//   const [nickname, setNickname] = useState(profile?.nickname);
//   const [location, setLocation] = useState(profile?.location);
//   const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
//   const [passwordError, setPasswordError] = useState('');
//   const [nicknameError, setNicknameError] = useState('');

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     console.log('file', file);

//     if (file) {
//       const profileImgUrl = URL.createObjectURL(file);
//       setImageFiles(file);
//       setImagePreview(profileImgUrl);
//       console.log('productImgUrl', profileImgUrl);
//     }
//   };

//   // 대체 이미지 설정 (엑박 이미지 안뜨게 처리)
//   const handleImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
//     e.target.src = placeholderImage;
//   };

//   const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newNickname = e.target.value;

//     // 글자수 제한
//     if (newNickname.length < 2 || newNickname.length > 8) {
//       setNicknameError('* 닉네임은 2~8글자를 사용해 주세요.');
//     } else {
//       setNicknameError('');
//     }

//     setNickname(newNickname);
//   };

//   const handleAddressChange = (address: string) => {
//     setLocation(address);
//   };

//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPhoneNumber(e.target.value);
//   };

//   /**
//    * 비밀번호 정규식
//    * (?=.*[a-z]): 최소한 하나의 소문자 포함
//    * (?=.*[A-Z]): 최소한 하나의 대문자 포함
//    * (?=.*\d): 최소한 하나의 숫자 포함
//    * (?=.[@$!%?&]): 최소한 하나의 특수기호 포함
//    * [A-Za-z\d@$!%*?&]{8,16}: 8자 이상, 16자 이하의 영 대/소문자, 숫자, 특수기호로 이루어진 문자열
//    */
//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
//     if (!passwordRegex.test(newPassword)) {
//       setPasswordError('* 비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.');
//     } else {
//       setPasswordError('');
//     }
//   };

//   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setConfirmPassword(newPassword);
//     setPasswordMatch(newPassword === password);
//   };

//   const { mutate } = useMutation({
//     mutationFn: (editedProfile: EditProfileToSend) => putEditProfiles(editedProfile),
//     onSuccess: () => {
//       alert('프로필 수정이 완료되었습니다.');
//       navigate('/my/profile');
//     },
//     onError: (error: Error) => {
//       console.error('에러 발생: ', error);
//       alert('프로필 수정에 실패하였습니다. 다시 시도해주세요.');
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setPasswordMatch(false);
//       return;
//     }

//     try {
//       // 여기서 data를 구성하여 넘겨줘야 합니다.
//       const data: EditProfileToSend = {
//         nickname: nickname as string,
//         password,
//         confirmPassword,
//         location: location as string,
//         phone: phoneNumber as string,
//       };
//       mutate(data);
//     } catch (error) {
//       console.error('에러 발생: ', error);
//       alert('프로필 수정에 실패하였습니다. 다시 시도해주세요.');
//     }
//   };

//   if (isLoading) return <Loading />;
//   if (error) return <Error />;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       method="POST"
//       encType="multipart/form-data"
//       className="flex items-center justify-center flex-col"
//     >
//       <Button
//         type="submit"
//         disabled={!password || !confirmPassword || !passwordMatch}
//         className="absolute right-0 top-0 py-0.5 px-3 my-[15px] mr-5"
//         size={'sm'}
//       >
//         완료
//       </Button>
//       {profile && (
//         <div key={profile.nickname}>
//           <div className="flex w-full items-center justify-center py-6">
//             <div className="w-full flex flex-col items-center justify-center gap-6">
//               <div className="relative w-[100px] h-[100px] flex items-center justify-center">
//                 {profile.profileImgUrl ? (
//                   <img
//                     src={profile.profileImgUrl}
//                     alt="프로필 이미지"
//                     className="flex items-center justify-center w-[100px] h-[100px] border rounded-[50%]"
//                   />
//                 ) : (
//                   <>
//                     <img
//                       src={user}
//                       alt=""
//                       onError={null || handleImageError}
//                       className="flex items-center justify-center w-[100px] h-[100px] rounded-full"
//                     />
//                   </>
//                 )}
//               </div>
//               <Button variant="secondary">사진변경</Button>
//               <input
//                 type="file"
//                 id="edit-image"
//                 accept="'image/*"
//                 onChange={handleImageChange}
//                 ref={profileImgFileInput}
//                 name="profileImgUrl"
//                 className="hidden"
//               />
//             </div>
//           </div>
//           <div className="w-full flex items-center gap-5 border-b">
//             <p className="w-[100px] font-bold">닉네임</p>
//             <input
//               type="text"
//               placeholder="닉네임"
//               defaultValue={profile.nickname}
//               name={nickname}
//               onChange={handleNicknameChange}
//               className="w-[250px] outline-none py-4 "
//             />
//           </div>
//           {nicknameError && <p className="text-red-500 text-xs">{nicknameError}</p>}
//           <div className="w-full flex items-center py-4 gap-5 border-b text-black">
//             <p className="w-[100px] font-bold">비밀번호</p>
//             <input
//               type="password"
//               placeholder="비밀번호 입력"
//               minLength={8}
//               maxLength={16}
//               value={password}
//               onChange={handlePasswordChange}
//               className="w-[250px] outline-none"
//             />
//           </div>
//           {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
//           <div className="w-full flex items-center py-4 gap-5 border-b text-black">
//             <p className="w-[100px] font-bold">비밀번호 확인</p>
//             <input
//               type="password"
//               placeholder="비밀번호 확인"
//               minLength={8}
//               maxLength={16}
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               className="w-[250px] outline-none"
//             />
//           </div>
//           {!passwordMatch && <p className="text-red-500 text-xs">* 입력하신 비밀번호가 일치하지 않습니다.</p>}
//           <div className="w-full flex items-center py-4 gap-5 border-b text-black">
//             <p className="w-[100px] font-bold">주소</p>
//             <DaumPost onAddressChange={handleAddressChange} />
//           </div>
//           <div className="w-full flex items-center py-4 gap-5 border-b text-black">
//             <p className="w-[100px] font-bold">전화번호</p>
//             <input
//               type="text"
//               placeholder="전화번호 입력"
//               defaultValue={profile.phoneNumber}
//               name={phoneNumber}
//               onChange={handlePhoneNumberChange}
//               maxLength={11}
//               className="w-[250px] outline-none"
//             />
//           </div>
//         </div>
//       )}
//     </form>
//   );
// }

import { getEditProfiles, putEditProfiles, updateProfileImage } from '@/apis/myPage/profiles';
import { useQuery } from '@tanstack/react-query';
import user from '@/assets/user.png';
import { useRef, useState } from 'react';
import DaumPost from './DaumPost';
import { useNavigate } from 'react-router-dom';
import { EditProfileToSend, EditProfile } from '@/types/profile';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import Loading from '../atoms/Loading';
import Error from '../atoms/Error';
import ErrorMessage from './ErrorMessage';
import ProfileImage from './ProfileImage';

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
  } = useForm<editProfileFormValues>(); // useForm hook 사용

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
  const [imageFile, setImageFiles] = useState<File | null>(null);
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
