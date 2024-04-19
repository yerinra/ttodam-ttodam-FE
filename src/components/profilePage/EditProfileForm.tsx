import { getEditProfiles } from '@/apis/myPage/profiles';
import { EditProfile } from '@/mocks/handlers/myPage/profile';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';

export default function EditProfileForm() {
  const [profiles, setProfiles] = useState<EditProfile[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['profiles/update'],
    queryFn: () => {
      return getEditProfiles();
    },
  });

  const profileImgFileInput = useRef(null);
  const [imageFile, setImageFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  console.log('이미지 파일 정보 확인', imageFile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file);

    if (file) {
      const productImgUrl = URL.createObjectURL(file);
      setImageFiles(file);
      setImagePreview(productImgUrl);
      console.log('productImgUrl', productImgUrl);
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
    <form className="flex items-center justify-center flex-col">
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
                      <MdAddAPhoto className=" absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-white" />
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
            <div className="w-full flex items-center justify-center gap-5 border-b">
              <p className="w-[100px] font-bold">닉네임</p>
              <input type="text" placeholder="닉네임" value={pf.nickname} className="outline-none py-4 " />
            </div>
            <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호</p>
              <input type="password" placeholder="비밀번호 입력" className="outline-none" />
            </div>
            <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">비밀번호 확인</p>
              <input type="password" placeholder="비밀번호 확인" className="outline-none" />
            </div>
            <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">주소</p>
              <input type="text" placeholder="주소" value={pf.location} className="outline-none" />
            </div>
            <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
              <p className="w-[100px] font-bold">전화번호</p>
              <input type="text" placeholder="전화번호 입력" value={pf.phoneNumber} className="outline-none" />
            </div>
          </div>
        ))}

      <button className="w-[80px] h-8 flex items-center justify-center py-0.5 px-3 rounded-md text-white mt-28 bg-[#F94A3F]">
        회원탈퇴
      </button>
    </form>
  );
}
