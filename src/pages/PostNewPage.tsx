import { FaLongArrowAltLeft } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function PostNewPage() {
  return (
    <section className="mt-24 pb-20">
      <div className="flex items-center justify-between border-b border-black h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link to="/">
            <FaLongArrowAltLeft className="w-5 h-5" />
          </Link>
          <h3 className="font-semibold">모집글 쓰기</h3>
        </div>
        <button type="submit" className="py-0.5 px-3 bg-[#4696D3] rounded-md text-white">
          등록
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between py-4 border-b">
          <button type="button" className="font-semibold w-11/12 text-left">
            카테고리
          </button>
          <button type="button">
            <RiArrowDownSLine className="w-6 h-6" />
          </button>
        </div>
        <form>
          <input type="text" placeholder="게시글 제목" className="w-full outline-none py-4 border-b" />
          <div className="flex items-center justify-between py-4 border-b text-black">
            <input type="text" placeholder="상품 이름" className="outline-none" />
            <button type="button">
              <FaPlus className="w-3 h-3 mr-1" />
            </button>
          </div>
          <div className="flex items-center justify-between py-4 border-b text-black">
            <input type="text" placeholder="상품 링크" className="outline-none" />
            <button type="button">
              <FaPlus className="w-3 h-3 mr-1" />
            </button>
          </div>
          <input type="text" placeholder="희망 거래 장소" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="희망 모집 인원" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="원래 가격" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="인당 가격" className="w-full outline-none py-4 border-b" />
          <input type="text" placeholder="마감일" className="w-full outline-none py-4 border-b" />
          <textarea
            cols={30}
            rows={10}
            placeholder="상세 정보"
            className="w-full outline-none py-4 border-b resize-none"
          ></textarea>
        </form>
        <div className="flex gap-8 w-full py-4 border-b">
          <p className="text-[#C4C4C4] font-semibold">사진</p>
          <button type="button" className="w-[53px] h-[53px] border bg-gray-300">
            +
          </button>
        </div>
      </div>
    </section>
  );
}
