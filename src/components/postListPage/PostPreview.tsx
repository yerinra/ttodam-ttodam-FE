import type { Product, Status } from '@/types/post';

import { Link } from 'react-router-dom';
import { Cross1Icon } from '@radix-ui/react-icons';
import Badge from '../atoms/Badge';
import { cn } from '@/lib/utils';
import ListItemContainer from '../atoms/ListItemContainer';

type PostPreviewProps = {
  removeBtn?: boolean;
  onDelete?: (bookmarkId: number) => Promise<void>;
  bookmarkId?: number;
  postId: number;
  status: Status;
  title: string;
  content?: string;
  products: Product[];
};

export default function PostPreview({
  removeBtn,
  onDelete,
  bookmarkId,
  postId,
  status,
  title,
  content,
  products,
}: PostPreviewProps) {
  const handleDelete = () => {
    if (onDelete && bookmarkId) onDelete(bookmarkId);
  };
  return (
    <ListItemContainer>
      <div className="flex items-center gap-x-2">
        <Badge variant={status}></Badge>

        <Link to={`/post/${postId}`} className="font-bold">
          {title}
        </Link>
        {removeBtn && (
          <button className="ml-auto" onClick={handleDelete}>
            <Cross1Icon />
          </button>
        )}
      </div>
      {content && <p className="text-sm">{content}</p>}
      <div className={cn({ 'mt-2': !content })}>
        <ul className="flex gap-2 text-sm items-center">
          {products &&
            products.map(product => (
              <Badge variant="secondary" classNames="opacity-80" key={product.productName}>
                {product.productName}
                {product.price && ` ${(product.price / product.count).toLocaleString()}원`}
              </Badge>
            ))}
        </ul>
      </div>
    </ListItemContainer>
  );
}
