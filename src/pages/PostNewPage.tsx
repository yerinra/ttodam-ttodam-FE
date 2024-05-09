import { Link } from 'react-router-dom';
import useRequireLogin from '@/hooks/useRequireLogin';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import H1 from '@/components/atoms/H1';
import PostForm from '@/components/postNewPage/PostForm';

export default function PostNewPage() {
  useRequireLogin();
  return (
    <>
      <section className="w-full flex items-center justify-between border-b h-[60px] gap-2.5 px-5 relative">
        <Link to="/posts/all">
          <ChevronLeftIcon className="w-5 h-5" />
        </Link>
      </section>

      <H1>게시글 작성하기</H1>
      <div className="w-full px-10 mb-10">
        <PostForm isEditing={false} />
      </div>
      {/* <Form /> */}
    </>
  );
}
