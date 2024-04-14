import { Post } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

type PostPreviewProps = {
  post: Post;
};

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <Link
      to={`/post/${post.Id}`}
      key={post.Id}
      className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
    >
      <div className="flex items-center gap-x-2">
        <StatusBadge status={post.status} />
        <h2 className="font-bold">{post.title}</h2>
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
    </Link>
  );
}
