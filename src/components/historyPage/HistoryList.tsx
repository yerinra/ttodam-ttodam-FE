// import { Link } from 'react-router-dom';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import { Card, CardContent } from '@/components/ui/card';

import { Link } from 'react-router-dom';

// export default function HistoryList() {
//   return (
//     <div className="w-full">
//       <div className="flex w-full justify-center flex-col border-b border-slate-200 py-6">
//         <div className="flex justify-center items-center gap-14">
//           <div className="flex justify-center">
//             <Carousel className="w-full max-w-sm">
//               <CarouselContent>
//                 <CarouselItem>
//                   <div className="p-1">
//                     <Card>
//                       <CardContent className="flex aspect-square items-center justify-center p-6">
//                         <div className="w-24 h-48 justify-center bg-no-repeat bg-cover bg-center" />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               </CarouselContent>
//               <CarouselPrevious className="bg-slate-200" />
//               <CarouselNext className="bg-slate-200" />
//             </Carousel>
//           </div>
//           <ul className="flex justify-center border-slate-200 gap-20">
//             <div className="ml-6 my-6">
//               <section className="grid grid-cols-1 gap-5 ">
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">게시글 제목</div>
//                   <div className="h-fit">휴지를 함께 사실 분을 모집합니다!</div>
//                 </li>
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">함께 산 상품</div>
//                   <div className="flex flex-col gap-1">
//                     <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">크리오덴티메이트 칫솔</div>
//                   </div>
//                 </li>
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">제품링크</div>
//                   <div className="flex flex-col gap-1">
//                     <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">https://zero-base.co.kr/</div>
//                   </div>
//                 </li>
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">함께한 참여자</div>
//                   <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">유저 1</div>
//                   <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">유저 2</div>
//                   <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">유저 3</div>
//                 </li>
//               </section>
//             </div>
//           </ul>
//         </div>
//         <div className="flex items-end justify-center flex-col mt-8">
//           <Link to="/my/history/:postId" className="flex justify-center py-0.5 px-3 bg-primary rounded-md text-white">
//             보기
//           </Link>
//         </div>
//       </div>
//       <div className="flex justify-center w-full flex-col border-b border-slate-200 py-6">
//         <div className="flex justify-center items-center gap-14">
//           <div className="flex justify-center">
//             <Carousel className="w-full max-w-sm">
//               <CarouselContent>
//                 <CarouselItem>
//                   <div className="p-1">
//                     <Card>
//                       <CardContent className="flex aspect-square items-center justify-center p-6">
//                         <div className="w-24 h-48 justify-center bg-no-repeat bg-cover bg-center" />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </div>
//           <ul className="flex justify-center border-slate-200 gap-20">
//             <div className="ml-6 my-6">
//               <section className="grid grid-cols-1 gap-5 ">
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">게시글 제목</div>
//                   <div className="h-fit">칫솔과 휴지를 함께 사실 분을 모집합니다!</div>
//                 </li>
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">함께 산 상품</div>
//                   <div className="flex flex-col gap-1">
//                     <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">크리오덴티메이트 칫솔</div>
//                     <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">크리오덴티메이트 칫솔</div>
//                   </div>
//                 </li>
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">제품링크</div>
//                   <div className="flex flex-col gap-1">
//                     <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">https://zero-base.co.kr/</div>
//                     <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">https://zero-base.co.kr/</div>
//                   </div>
//                 </li>
//                 <li className="flex gap-5">
//                   <div className="text-dark-gray font-bold w-24 flex-shrink-0">함께한 참여자</div>
//                   <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">유저 1</div>
//                   <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">유저 2</div>
//                   <div className="h-fit px-[6px] py-[2px] bg-slate-200 rounded-sm">유저 3</div>
//                 </li>
//               </section>
//             </div>
//           </ul>
//         </div>
//         <div className="flex items-end justify-center flex-col mt-8">
//           <Link to="/my/history/:postId" className="flex justify-center py-0.5 px-3 bg-primary rounded-md text-white">
//             보기
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function HistoryList() {
  return (
    <div className="w-full mt-6">
      <Link
        to="/my/history/:postId"
        className="w-full flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] hover:bg-secondary gap-y-2 transition-all p-4"
      >
        <div className="flex items-center gap-x-2">
          <h2 className="font-bold">칫솔과 휴지를 함께 사실 분을 모집합니다!</h2>
        </div>
        <div className="flex">
          <ul className="flex flex-col gap-2 text-sm opacity-50">
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께 산 상품</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">제품링크</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">https://zero-base.co.kr/</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">모집상태</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">모집중</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께한 참여자</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 1</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 2</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 3</div>
            </li>
          </ul>
        </div>
        <div className="flex items-end justify-center flex-col">
          <button className="flex justify-center py-0.5 px-3 bg-primary rounded-md text-white">보기</button>
        </div>
      </Link>
      <Link
        to="/my/history/:postId"
        className="w-full flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] hover:bg-secondary gap-y-2 transition-all p-4"
      >
        <div className="flex items-center gap-x-2">
          <h2 className="font-bold">칫솔과 휴지를 함께 사실 분을 모집합니다!</h2>
        </div>
        <div className="flex">
          <ul className="flex flex-col gap-2 text-sm opacity-50">
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께 산 상품</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">크리오덴티메이트 칫솔</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">제품링크</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">https://zero-base.co.kr/</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">모집상태</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">모집중</div>
            </li>
            <li className="flex gap-2 py-[2px]">
              <div className="font-bold flex-shrink-0 ">함께한 참여자</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 1</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 2</div>
              <div className="bg-slate-200 rounded-sm text-center py-[2px] px-[6px]">유저 3</div>
            </li>
          </ul>
        </div>
        <div className="flex items-end justify-center flex-col">
          <button className="flex justify-center py-0.5 px-3 bg-primary rounded-md text-white">보기</button>
        </div>
      </Link>
    </div>
  );
}
