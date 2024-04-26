import { Link } from 'react-router-dom';
import { Product, Status } from '@/types/post';
import MannersDialog from './MannersDialog';
import Badge from '../atoms/Badge';
import ListItemContainer from '../atoms/ListItemContainer';

type HistoryPreviewProps = {
  postId: number;
  status: Status;
  title: string;
  products: Product[];
  startDate: string;
  endDate: string;
};

export default function HistoryPreview({ postId, status, title, products, startDate, endDate }: HistoryPreviewProps) {
  return (
    <ListItemContainer>
      <div className="relative flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <Badge variant={status} />

          <Link to={`/post/${postId}`} className="font-bold">
            {title}
          </Link>
        </div>
        <div className="flex">
          <ul className="flex gap-2 text-sm items-center opacity-50">
            {products &&
              products.map(product => (
                <li className="px-[6px] py-[2px] bg-slate-200 rounded-sm" key={product.productName}>
                  {`${product.productName} ${(product.price / product.count).toLocaleString()}원`}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex gap-2 text-sm items-center opacity-50">
          <div className="px-[6px] py-[2px] bg-slate-200 rounded-sm">{`시작일 ${startDate}`}</div>
          <div className="px-[6px] py-[2px] bg-slate-200 rounded-sm">{`마감일 ${endDate}`}</div>
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
      </div>
    </ListItemContainer>
  );
}
