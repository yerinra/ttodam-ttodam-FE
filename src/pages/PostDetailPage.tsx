import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deletePost, getPost } from '@/apis/post/post';

import type { Post } from '@/types/post';


import useUserInfoStore from '@/store/userInfoStore';
import ProductImg from '@/components/postDetailPage/ProductImg';
import ContentSection from '@/components/postDetailPage/ContentSection';
import BackToListBtn from '@/components/postDetailPage/BackToListBtn';
import PostMetaDataSection from '@/components/postDetailPage/PostMetaDataSection';
import PostHeader from '@/components/postDetailPage/PostHeader';

export default function PostDetailPage() {
  const { postId } = useParams();

  const { data, error, isLoading } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => {
      return getPost(+postId!);
    },
  });
  const userInfo = useUserInfoStore(state => state.userInfo);
  const queryClient = useQueryClient();
  const isUserPost = userInfo && data && userInfo.id === data.user.id;

  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      // 포스트 삭제 성공 시, 쿼리 캐시를 업데이트하고 리스트 페이지로 이동
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      location.href = '/posts/all';
    },
    onError: () => {
      console.error('Error deleting post');
    },
  });

  const handleDeletePost = (postId: number) => {
    // 포스트 삭제 요청
    data && data.Id && deletePostMutation.mutate(postId);
  };

  if (error) return <div>에러가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {data && (
        <>
          <PostHeader data={data} isUserPost={isUserPost} handleDeletePost={handleDeletePost} />
          <ProductImg data={data} />
          <PostMetaDataSection data={data} />
          <ContentSection data={data} />
          <BackToListBtn data={data} />
        </>
      )}
    </div>
  );
}
