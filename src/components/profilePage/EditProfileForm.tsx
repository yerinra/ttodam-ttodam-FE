import { getEditProfiles } from '@/apis/myPage/profiles';
import { EditProfile } from '@/mocks/handlers/myPage/profile';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import DaumPost from './DaumPost';
import placeholderImage from '@/assets/placeholderImage.png';

// TODO: 컴포넌트 분리하기
// TODO: 회원탈퇴 기능 구현하기
export default function EditProfileForm() {
  const profileImgFileInput = useRef(null);
  const [profiles, setProfiles] = useState<EditProfile[]>([]);
  const [imageFile, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const { data, error, isLoading } = useQuery({
    queryKey: ['profiles/update'],
    queryFn: () => {
      return getEditProfiles();
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file);

    if (file) {
      const profileImgUrl = URL.createObjectURL(file);
      setImageFiles(file);
      setImagePreview(profileImgUrl);
      console.log('productImgUrl', profileImgUrl);
    }
  };

  // 대체 이미지 설정 (엑박 이미지 안뜨게 처리)
  const handleImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = placeholderImage;
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;

    // 글자수 제한
    if (newNickname.length < 2 || newNickname.length > 8) {
      setNicknameError('* 닉네임은 2~8글자를 사용해 주세요.');
    } else {
      setNicknameError('');
    }

    // 중복 검사
    const isNickNameAvailable = !profiles.some(profile => profile.nickname === newNickname);
    if (!isNickNameAvailable) {
      setNicknameError('이미 사용 중인 닉네임입니다.');
    } else {
      setNicknameError('사용 가능한 닉네임입니다.');
    }

    setNickname(newNickname);
  };

  const handleAddressChange = (address: string) => {
    setLocation(address);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  /**
   * 비밀번호 정규식
   * (?=.*[a-z]): 최소한 하나의 소문자 포함
   * (?=.*[A-Z]): 최소한 하나의 대문자 포함
   * (?=.*\d): 최소한 하나의 숫자 포함
   * (?=.[@$!%?&]): 최소한 하나의 특수기호 포함
   * [A-Za-z\d@$!%*?&]{8,16}: 8자 이상, 16자 이하의 영 대/소문자, 숫자, 특수기호로 이루어진 문자열
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('* 비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    setPasswordMatch(newPassword === password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('location', location);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    if (imageFile) {
      const profileImgUrl = URL.createObjectURL(imageFile);
      formData.append('profileImg', profileImgUrl);
    }

    try {
      const response = await axios.post('/users/:userId/profiles/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('응답: ', response.data);
      alert('프로필 수정이 완료되었습니다.');
    } catch (error) {
      console.error('에러 발생: ', error);
      alert('프로필 수정에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getEditProfiles();
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles: ', error);
      }
    };
    fetchProfiles();
  }, []);

  if (isLoading) return <div>프로필 정보를 가져오는 중입니다.</div>;
  if (error) return <div>프로필 정보를 가져오는데 실패하였습니다.</div>;

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
      className="flex items-center justify-center flex-col"
    >
      <input
        type="submit"
        value={'완료'}
        className="absolute right-0 top-0 py-0.5 px-3 bg-primary rounded-md text-white my-[15px] mr-5"
      />
      {data &&
        data?.editProfile?.map((pf: EditProfile) => (
          <div key={pf.id}>
            <div className="flex w-full items-center justify-center py-6">
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                  {pf.profileImgUrl ? (
                    <img
                      src={pf.profileImgUrl}
                      alt="프로필 이미지"
                      className="flex items-center justify-center w-[100px] h-[100px] border rounded-[50%]"
                    />
                  ) : (
                    <>
                      <img
                        src={imagePreview}
                        alt=""
                        onError={null || handleImageError}
                        className="flex items-center justify-center w-[100px] h-[100px] bg-slate-400 rounded-[50%]"
                      />
                      <MdAddAPhoto className=" absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-white opacity-70" />
                    </>
                  )}
                </div>
                <label
                  htmlFor={`edit-image`}
                  className="w-[80px] h-8 flex items-center justify-center py-0.5 px-3 bg-primary rounded-md text-white cursor-pointer"
                >
                  사진변경
                </label>
                <input
                  type="file"
                  id="edit-image"
                  accept="'image/*"
                  onChange={handleImageChange}
                  ref={profileImgFileInput}
                  name="profileImgUrl"
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-5 border-b">
              <p className="w-[100px] font-bold">닉네임</p>
              <input
                type="text"
                placeholder="닉네임"
                defaultValue={pf.nickname}
                name={nickname}
                onChange={handleNicknameChange}
                className="w-[250px] outline-none py-4 "
              />
            </div>
            {nicknameError && <p className="text-red-500 text-xs">{nicknameError}</p>}
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호 입력"
                minLength={8}
                maxLength={16}
                value={password}
                onChange={handlePasswordChange}
                className="w-[250px] outline-none"
              />
            </div>
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호 확인</p>
              <input
                type="password"
                placeholder="비밀번호 확인"
                minLength={8}
                maxLength={16}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-[250px] outline-none"
              />
            </div>
            {!passwordMatch && <p className="text-red-500 text-xs">* 입력하신 비밀번호가 일치하지 않습니다.</p>}
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">주소</p>
              <DaumPost onAddressChange={handleAddressChange} />
            </div>
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">전화번호</p>
              <input
                type="text"
                placeholder="전화번호 입력"
                defaultValue={pf.phoneNumber}
                name={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={11}
                className="w-[250px] outline-none"
              />
            </div>
          </div>
        ))}
    </form>
  );
}
