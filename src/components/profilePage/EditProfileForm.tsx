export default function EditProfileForm() {
  return (
    <form className="flex items-center justify-center flex-col">
      <input
        type="submit"
        value={'완료'}
        className="absolute right-0 top-0 py-0.5 px-3 bg-primary rounded-md text-white my-[15px] mr-5"
      />
      <div className="flex w-full items-center justify-center py-6">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <img src="" alt="" className="w-[100px] h-[100px] bg-gray-500 rounded-[50%]" />
          <label
            htmlFor={`edit-image`}
            className="w-[80px] h-8 flex items-center justify-center py-0.5 px-3 bg-primary rounded-md text-white cursor-pointer"
          >
            사진변경
          </label>
          <input type="file" id="edit-image" accept="'image/*" className="hidden" />
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-5 border-b">
        <p className="w-[100px] font-bold">닉네임</p>
        <input type="text" placeholder="닉네임" className="outline-none py-4 " />
      </div>
      <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
        <p className="w-[100px] font-bold">비밀번호</p>
        <input type="text" placeholder="비밀번호 입력" className="outline-none" />
      </div>
      <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
        <p className="w-[100px] font-bold">비밀번호 확인</p>
        <input type="text" placeholder="비밀번호 확인" className="outline-none" />
      </div>
      <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
        <p className="w-[100px] font-bold">주소</p>
        <input type="text" placeholder="주소" className="outline-none" />
      </div>
      <div className="w-full flex items-center justify-center py-4 gap-5 border-b text-black">
        <p className="w-[100px] font-bold">전화번호</p>
        <input type="text" placeholder="전화번호 입력" className="outline-none" />
      </div>
      <button className="w-[80px] h-8 flex items-center justify-center py-0.5 px-3 rounded-md text-white mt-28 bg-[#F94A3F]">
        회원탈퇴
      </button>
    </form>
  );
}
