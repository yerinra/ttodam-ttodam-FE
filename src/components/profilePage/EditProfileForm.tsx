import { getEditProfiles } from '@/apis/myPage/profiles';
import { EditProfile } from '@/mocks/handlers/myPage/profile';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import DaumPost from './DaumPost';

export default function EditProfileForm() {
  const profileImgFileInput = useRef(null);
  const [profiles, setProfiles] = useState<EditProfile[]>([]);
  const [imageFile, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 주소 변경
  const handleAddressChange = (address: string) => {
    setLocation(address);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('location', location);
    formData.append('phoneNumber', phoneNumber);
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
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호 입력"
                minLength={8}
                maxLength={16}
                className="w-[250px] outline-none"
              />
            </div>
            <div className="w-full flex items-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호 확인</p>
              <input
                type="password"
                placeholder="비밀번호 확인"
                minLength={8}
                maxLength={16}
                className="w-[250px] outline-none"
              />
            </div>
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
      <button className="w-[80px] h-8 flex items-center justify-center py-0.5 px-3 rounded-md text-white mt-28 bg-[#F94A3F]">
        회원탈퇴
      </button>
    </form>
  );
}
