import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPost } from '@/apis/post/post';

import type { Post } from '@/types/post';

import useUserInfoStore from '@/store/userInfoStore';
import ProductImg from '@/components/postDetailPage/ProductImg';
import ContentSection from '@/components/postDetailPage/ContentSection';
import BackToListBtn from '@/components/postDetailPage/BackToListBtn';
import PostMetaDataSection from '@/components/postDetailPage/PostMetaDataSection';
import PostHeader from '@/components/postDetailPage/PostHeader';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useEffect } from 'react';

export default function PostDetailPage() {
  const { postId } = useParams();

  const { data, error, isLoading } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => {
      return getPost(+postId!);
    },
  });
  const userInfo = useUserInfoStore(state => state.userInfo);
  const { setCurrentPostId } = useCurrentPostIdStore();

  useEffect(() => {
    if (postId) {
      setCurrentPostId(+postId);
    } else {
      setCurrentPostId(null);
    }
  }, [postId, setCurrentPostId]);

  const isUserPost = userInfo && data && userInfo.id === data.user.id;

  if (error) return <div>에러가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {data && (
        <>
          <PostHeader data={data} isUserPost={isUserPost} />
          <ProductImg data={data} />
          <PostMetaDataSection data={data} />
          <ContentSection data={data} />
          <BackToListBtn data={data} />
        </>
      )}
    </div>
  );
}
