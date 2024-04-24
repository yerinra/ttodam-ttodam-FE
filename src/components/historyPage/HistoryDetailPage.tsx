import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import KakaoMapScriptLoader from '@/map/KakaoMapScriptLoader';
import { Link } from 'react-router-dom';

export default function HistoryDetailPage() {
  return (
    <section className="flex flex-col items-center gap-2 border-b border-slate-200 py-6">
      <h1 className="font-bold text-3xl">칫솔과 휴지를 함께 사실 분을 모집합니다!</h1>
      <div className="flex justify-center">
        <Carousel className="w-full max-w-sm my-10">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="w-24 h-48 justify-center bg-no-repeat bg-cover bg-center" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <ul className="flex justify-center border-slate-200 py-6 gap-20">
          <div className="ml-6 my-6">
            <section className="grid grid-cols-1 gap-5 ">
              <li className="flex gap-5">
                <div className="text-dark-gray font-bold w-24 flex-shrink-0">함께 산 상품</div>
                <div className="h-fit">크리오덴티메이트 칫솔</div>
              </li>
              <li className="flex items-center gap-5">
                <div className="text-dark-gray font-bold w-24 flex-shrink-0">함께한 참여자</div>
                <div className="h-fit">유저 1</div>
                <div className="h-fit">유저 2</div>
                <div className="h-fit">유저 3</div>
                <Button variant={'outline'} size={'lg'}>
                  채팅
                </Button>
              </li>
              <li className="flex gap-5">
                <div className="text-dark-gray font-bold w-24 flex-shrink-0">만남장소</div>
                <div className="h-fit">서울특별시 강남구 테헤란로 427</div>
              </li>
            </section>
            <KakaoMapScriptLoader>
              <div className="w-full h-[100px] border mt-8">지도 영역</div>
            </KakaoMapScriptLoader>
          </div>
        </ul>
      </div>
      <div className="flex gap-2">
        <Button className="w-[150px] mt-4 mb-20" variant={'outline'}>
          매너점수 평가하기
        </Button>
        <Button className="ml-auto mt-4 mb-20" variant={'outline'}>
          <Link to="/my/history">목록으로</Link>
        </Button>
      </div>
    </section>
  );
}
