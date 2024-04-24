import { Link } from 'react-router-dom';

import type { Post } from '@/types/post';
import { cn } from '@/lib/utils';
import PostPreview from './PostPreview';

type PostListProps = {
  currentPosts: Post[];
};

export default function PostList({ currentPosts }: PostListProps) {
  return (
    <section>
      {currentPosts && currentPosts.map((post: Post) => <PostPreview key={post.Id} post={post} />)}
      {(!currentPosts || currentPosts.length == 0) && (
        <p className="flex justify-center items-center py-10">해당하는 글이 없습니다.</p>
      )}
    </section>
  );
}
