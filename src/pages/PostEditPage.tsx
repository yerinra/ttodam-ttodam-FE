import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPost } from '@/apis/post/post';
import type { PostDetail, PostEdit } from '@/types/post';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useEffect } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import H1 from '@/components/atoms/H1';
import PostForm from '@/components/postNewPage/PostForm';

export default function PostEditPage() {
  const { postId } = useParams();

  const { data, error, isLoading } = useQuery<PostDetail>({
    queryKey: ['post', postId],
    queryFn: () => {
      return getPost(+postId!);
    },
  });

  const { setCurrentPostId } = useCurrentPostIdStore();

  useEffect(() => {
    if (postId) {
      setCurrentPostId(+postId);
    } else {
      setCurrentPostId(null);
    }
    return () => setCurrentPostId(null);
  }, [postId, setCurrentPostId]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  const { title, deadline, category, participants, place, content } = data!.post;

  const defaultValues = {
    title,
    deadline,
    category,
    participants,
    place,
    content,
    products: data?.post.products.map(p => {
      return { productName: p.productName, price: p.price, count: p.count, purchaseLink: p.purchaseLink };
    }),
  };
  return (
    <>
      <section className="w-full flex items-center justify-between border-b h-[60px] gap-2.5 px-5 relative">
        <Link to={`/post/${postId}`}>
          <ChevronLeftIcon className="w-5 h-5" />
        </Link>
      </section>

      <H1>게시글 수정하기</H1>
      <div className="w-full px-10 mb-10">
        <PostForm
          postId={+postId!}
          isEditing={true}
          defaultValues={defaultValues as PostEdit}
          imageURL={data?.post.imgUrls}
        />
      </div>
    </>
  );
}
