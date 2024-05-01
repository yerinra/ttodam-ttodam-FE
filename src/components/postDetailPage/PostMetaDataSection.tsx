import KakaoMapScriptLoader from '@/map/KakaoMapScriptLoader';
import Map from './Map';
import { categoryNameKR, formatDate } from '@/lib/utils';

import type { Category, PostDetail } from '@/types/post';

import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';

import MapMarker from './MapMarker';

type PostMetaDataSectionProps = {
  data: PostDetail;
};
export default function PostMetaDataSection({ data }: PostMetaDataSectionProps) {
  const { post } = data;
  const metaData = [
    { desc: '카테고리', content: post.category },
    { desc: '모집인원', content: post.participants },
    { desc: '마감일', content: post.deadline },
    { desc: '만남장소', content: post.place },
  ];

  return (
    <ul className="flex justify-center border-b border-slate-200 py-6 gap-20">
      <div className="ml-6 my-6">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section className="flex gap-3">
            <div className="text-dark-gray font-bold w-24 h-10 flex-shrink-0">함께 살 상품</div>
            <div className="flex flex-col gap-2">
              {data &&
                post.products.map(product => (
                  <Badge variant="secondary" key={product.productId} classNames="hover:bg-opacity-80">
                    <Link to={product.purchaseLink as string} className="flex flex-col">
                      <div>{product.productName}</div>
                      <div>
                        {Math.ceil(product.price / post.participants).toLocaleString()}원 *{' '}
                        {product.count / post.participants}
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
          <Map lat={post.plocationX} lng={post.plocationY}>
            <MapMarker lat={post.plocationX} lng={post.plocationY} />
          </Map>
        </KakaoMapScriptLoader>
      </div>
    </ul>
  );
}
