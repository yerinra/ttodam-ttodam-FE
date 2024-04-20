import KakaoMapScriptLoader from '@/map/KakaoMapScriptLoader';
import Map from './Map';
import { categoryNameKR, cn, formatDate } from '@/lib/utils';

import { Category, Post } from '@/types/post';

import { Link } from 'react-router-dom';

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
                  <div
                    key={product.productId}
                    className="bg-slate-200 opacity-50 px-3 py-1 rounded-md  hover:bg-gray-300 transition-all"
                  >
                    <Link to={product.purchaseLink} className="flex flex-col">
                      <div>{product.productName}</div>
                      <div>
                        {Math.ceil(product.price / data.participants).toLocaleString()}원 *{' '}
                        {product.count / data.participants}
                        EA
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </section>
          {data &&
            metaData.map(meta => (
              <li key={meta.desc} className="flex gap-5">
                <div className="text-dark-gray font-bold w-24 flex-shrink-0">{meta.desc}</div>
                <div
                  className={cn('h-fit', {
                    'bg-primary/30 px-2 py-[2px] text-primary font-semibold rounded-sm': meta.desc === '카테고리',
                  })}
                >
                  {meta.desc === '마감일'
                    ? formatDate(meta.content as string)
                    : meta.desc === '카테고리'
                      ? categoryNameKR(meta.content as Exclude<Category, 'ALL'>)
                      : meta.content}
                </div>
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
