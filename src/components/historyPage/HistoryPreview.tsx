import { Link } from 'react-router-dom';
import StatusBadge from '../postListPage/StatusBadge';
import { Post } from '@/types/post';
import MannersDialog from './MannersDialog';

type HistoryPreviewProps = {
  post: Post;
};

export default function HistoryPreview({ post }: HistoryPreviewProps) {
  return (
    <li
      key={post.Id}
      className="relative flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all"
    >
      <div className="flex items-center gap-x-2">
        <StatusBadge status={post.status} />

        <Link to={`/post/${post.Id}`} className="font-bold">
          {post.title}
        </Link>
      </div>
      <div className="flex">
        <ul className="flex gap-2 text-sm items-center opacity-50">
          {post.products.map(product => (
            <li className="px-[6px] py-[2px]  bg-slate-200 rounded-sm" key={product.productId}>
              {`${product.productName} ${(product.price / product.count).toLocaleString()}원`}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-[50%] right-0 translate-y-[-50%]">
        <MannersDialog
          data={{
            membersId: 0,
            nickname: '',
            manners: 0,
          }}
        />
      </div>
    </li>
  );
}
