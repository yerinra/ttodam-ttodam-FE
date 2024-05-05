import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';
import ListItemContainer from '../atoms/ListItemContainer';
import { categoryNameKR, formatDate } from '@/lib/utils';
import { Category, PostPreview } from '@/types/post';

type MyPostItemProps = {
  post: PostPreview;
  onDelete: () => Promise<void>;
};

export default function MyPostItem({ post, onDelete }: MyPostItemProps) {
  return (
    <ListItemContainer>
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="primary">{categoryNameKR(post.category as Exclude<Category, 'ALL'>)}</Badge>
          <div className="py-2">
            <Link to={`/post/${post.postId}`} className="font-semibold">
              {post.title}
            </Link>
            <div className="text-sm py-1">{post.content}</div>
          </div>
          <div className="text-sm text-dark-gray">{formatDate(post.createdAt)}</div>
        </div>
        <div className="flex gap-2">
          <Link to={`/post/edit/${post.postId}`}>
            <Button variant="secondary" size="sm">
              수정
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            삭제
          </Button>
        </div>
      </div>
    </ListItemContainer>
  );
}
