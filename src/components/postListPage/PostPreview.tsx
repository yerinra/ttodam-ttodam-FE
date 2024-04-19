import { Post } from '@/lib/types';

import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Cross1Icon } from '@radix-ui/react-icons';

type PostPreviewProps = {
  post: Post;
  removeBtn?: boolean;
  onDelete?: (bookmarkId: number) => Promise<void>;
  bookmarkId?: number;
};

export default function PostPreview({ post, removeBtn, onDelete, bookmarkId }: PostPreviewProps) {
  const handleDelete = () => {
    if (onDelete && bookmarkId) onDelete(bookmarkId);
  };
  return (
    <li
      key={post.Id}
      className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
    >
      <div className="flex items-center gap-x-2">
        <StatusBadge status={post.status} />

        <Link to={`/post/${post.Id}`} className="font-bold">
          {post.title}
        </Link>
        {removeBtn && (
          <button className="ml-auto" onClick={handleDelete}>
            <Cross1Icon />
          </button>
        )}
      </div>
      <p className="text-sm">{post.content}</p>
      <div className="flex">
        <ul className="flex gap-2 text-sm items-center opacity-50">
          {post.products.map(product => (
            <li className="px-[6px] py-[2px]  bg-slate-200 rounded-sm" key={product.productId}>
              {`${product.productName} ${(product.price / product.count).toLocaleString()}원`}
            </li>
          ))}
        </ul>
      </div>

    </li>

  );
}
