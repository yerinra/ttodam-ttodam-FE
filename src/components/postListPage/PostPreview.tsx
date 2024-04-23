import type { Product, Status } from '@/types/post';

import { Link } from 'react-router-dom';
import { Cross1Icon } from '@radix-ui/react-icons';
import Badge from '../atoms/Badge';
import { cn } from '@/lib/utils';

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
    <li
      key={postId}
      className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
    >
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
    </li>
  );
}
