import type { PostPreview as TPostPreview } from '@/types/post';
import PostPreview from './PostPreview';

type PostListProps = {
  currentPosts: TPostPreview[];
};

export default function PostList({ currentPosts }: PostListProps) {
  return (
    <section>
      {currentPosts &&
        currentPosts.map(post => (
          <PostPreview
            key={post.postId}
            postId={post.postId}
            status={post.status}
            title={post.title}
            content={post.content}
            products={post.products}
          />
        ))}
      {(!currentPosts || currentPosts.length == 0) && (
        <p className="flex justify-center items-center py-10">해당하는 글이 없습니다.</p>
      )}
    </section>
  );
}
