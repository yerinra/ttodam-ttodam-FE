import KakaoMapScriptLoader from '@/map/KakaoMapScriptLoader';
import Map from './Map';
import { categoryNameKR, formatDate } from '@/lib/utils';

import type { Category, Post } from '@/types/post';

import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';

type PostMetaDataSectionProps = {
  data: Post;
};
export default function PostMetaDataSection({ data }: PostMetaDataSectionProps) {
  const metaData = [
    { desc: '카테고리', content: data?.category },
    { desc: '모집인원', content: data?.participants },
    { desc: '마감일', content: data?.deadline },
    { desc: '만남장소', content: data?.place },
  ];

  return (
    <ul className="flex justify-center border-b border-slate-200 py-6 gap-20">
      <div className="ml-6 my-6">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section className="flex gap-3">
            <div className="text-dark-gray font-bold w-24 h-10 flex-shrink-0">함께 살 상품</div>
            <div className="flex flex-col gap-2">
              {data &&
                data.products.map(product => (
                  <Badge variant="secondary" key={product.productId} classNames="hover:bg-opacity-80">
                    <Link to={product.purchaseLink as string} className="flex flex-col">
                      <div>{product.productName}</div>
                      <div>
                        {Math.ceil(product.price / data.participants).toLocaleString()}원 *{' '}
                        {product.count / data.participants}
                        EA
                      </div>
                    </Link>
                  </Badge>
                ))}
            </div>
          </section>
          {data &&
            metaData.map(meta => (
              <li key={meta.desc} className="flex gap-5">
                <div className="text-dark-gray font-bold w-24 flex-shrink-0">{meta.desc}</div>
                {meta.desc == '카테고리' && (
                  <Badge variant="primary" classNames="px-2 py-1 text-md -ml-1">
                    {categoryNameKR(meta.content as Exclude<Category, 'ALL'>)}
                  </Badge>
                )}
                {meta.desc == '마감일' && <div>{formatDate(meta.content as string)}</div>}
                {meta.desc !== '카테고리' && meta.desc !== '마감일' && <div>{meta.content}</div>}
              </li>
            ))}
        </section>

        <KakaoMapScriptLoader>
          <Map lat={data.pLocationX} lng={data.pLocationY}></Map>
        </KakaoMapScriptLoader>
      </div>
    </ul>
  );
}
