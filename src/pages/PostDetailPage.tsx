import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Category, Post } from '@/lib/types';
import axios from 'axios';
import { categoryNameKR, cn, formatDate } from '@/lib/utils';
import { ClockIcon } from '@radix-ui/react-icons';
import StatusBadge from '@/components/postListPage/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import KakaoMapScriptLoader from '@/map/KakaoMapScriptLoader';
import Map from '@/components/postDetailPage/Map';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [data, setData] = useState<Post>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `/post/${postId}`;

        const response = await axios.get(apiUrl);

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [postId]);
  const metaData = [
    { desc: '카테고리', content: data?.category },
    { desc: '모집인원', content: data?.participants },
    { desc: '마감일', content: data?.deadline },
    { desc: '만남장소', content: data?.place },
    // { desc: '함께 살 상품', content: data?.products },
  ];
  return (
    <div className="flex flex-col">
      {data && (
        <>
          {/* 제목 */}
          <section className="flex flex-col gap-2 border-b border-slate-200 py-6">
            <StatusBadge status={data.status} variant="detail" />
            <h1 className="font-bold text-3xl">{data.title}</h1>

            <section className="flex items-center mt-3 mb-3 justify-between">
              <div className="flex items-center gap-2">
                {data.user.profileImgUrl == '' && (
                  <div className="w-10 h-10 bg-slate-300 rounded-full">{data.user.profileImgUrl}</div>
                )}
                {data.user.profileImgUrl !== '' && (
                  <div
                    style={{ backgroundImage: `url(${data.user.profileImgUrl})` }}
                    className="w-10 h-10 justify-center bg-no-repeat bg-cover bg-center rounded-full"
                  />
                )}

                <div className="flex flex-col items-start gap-1">
                  <div className="font-semibold">{data.user.nickname}</div>
                  <div className="text-sm bg-primary/20 px-1 py-[2px] text-primary rounded-md font-semibold">
                    {data.user.manners * 20}점
                  </div>
                </div>
              </div>
              <Button variant={'outline'} size={'lg'}>
                1:1 채팅
              </Button>
            </section>
            <div className="flex gap-2 items-center text-slate-600">
              <ClockIcon />
              {formatDate(data.createAt)}
            </div>
          </section>
          <section className="flex justify-center">
            {data.productImgUrl.length > 0 && (
              <Carousel className="w-full max-w-sm my-10">
                <CarouselContent>
                  {data.productImgUrl.map((productImg, i) => (
                    <CarouselItem key={i}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div
                              style={{ backgroundImage: `url(${productImg})` }}
                              className="w-24 h-48 justify-center bg-no-repeat bg-cover bg-center"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </section>
          {/* 메타정보 */}
          <ul className="flex justify-center border-b border-slate-200 py-6 gap-20">
            <div className="ml-6 my-6">
              <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <section className="flex gap-4">
                  <div className="text-dark-gray font-bold w-24 h-10 flex-shrink-0">함께 살 상품</div>
                  <div className="flex flex-col gap-1">
                    {data &&
                      data.products.map(product => (
                        <div
                          key={product.productId}
                          className="bg-slate-200 opacity-50 px-2 py-1 rounded-md  hover:bg-gray-300 transition-all"
                        >
                          <Link to={product.purchaseLink} className="flex flex-col">
                            <div>{product.productName}</div>
                            <div>
                              {(product.price / data.participants).toLocaleString()}원 *{' '}
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
                    <li key={meta.desc} className="flex gap-4">
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
              {/* <section className="bg-black w-full mt-10 h-48"></section> */}
              <KakaoMapScriptLoader>
                <Map lat={data.pLocationX} lng={data.pLocationY}></Map>
              </KakaoMapScriptLoader>
            </div>
          </ul>
          {/* 상품정보 및 글 */}
          <section className="flex flex-col items-center border-b border-slate-200 py-12 text-slate-800 text-md">
            {/* {data.productImgUrl.length > 0 && (
              <Carousel className="w-full max-w-md mb-10">
                <CarouselContent>
                  {data.productImgUrl.map((productImg, i) => (
                    <CarouselItem key={innerHeight}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div
                              key={i}
                              style={{ backgroundImage: `url(${productImg})` }}
                              className="w-24 h-48 justify-center bg-no-repeat bg-cover bg-center"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )} */}

            <div className="">{data?.content}</div>
          </section>
          {/* 목록으로 가기 버튼 */}
          <Button size={'lg'}>참여신청하기</Button>
          <Button className="mt-4 mb-20" variant={'outline'}>
            <Link to={`/posts/${data?.category.toLowerCase()}`}>목록으로</Link>
          </Button>
        </>
      )}
    </div>
  );
}
