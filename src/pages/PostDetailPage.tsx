import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPost } from '@/apis/post/post';
import ProductImg from '@/components/postDetailPage/ProductImg';
import ContentSection from '@/components/postDetailPage/ContentSection';
import BackToListBtn from '@/components/postDetailPage/BackToListBtn';
import PostMetaDataSection from '@/components/postDetailPage/PostMetaDataSection';
import PostHeader from '@/components/postDetailPage/PostHeader';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useEffect } from 'react';
import { PostDetail } from '@/types/post';
import Error from '@/components/atoms/Error';
import Loading from '@/components/atoms/Loading';

export default function PostDetailPage() {
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

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      {data && (
        <>
          <PostHeader data={data} isUserPost={data.loginUserRequestStatus == 'AUTHOR'} />
          <ProductImg data={data} />
          <PostMetaDataSection data={data} />
          <ContentSection data={data} />
          <BackToListBtn data={data} />
        </>
      )}
    </div>
  );
}
