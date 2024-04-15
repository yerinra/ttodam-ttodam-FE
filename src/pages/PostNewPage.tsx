import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Category from '@/components/postNewPage/Category';
import Form from '@/components/postNewPage/Form';


export default function PostNewPage() {
  return (
    <section className="px-5 w-full">
      <div className="flex items-center justify-between border-b border-black h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link to="/posts/all">
            <FaLongArrowAltLeft className="w-5 h-5" />
          </Link>
          <h3 className="font-semibold">모집글 쓰기</h3>
        </div>
        <button type="submit" className="py-0.5 px-3 bg-primary rounded-md text-white">
          등록
        </button>
      </div>
      <div>
        <Category />
        <Form />
      </div>
    </section>
  );
}
