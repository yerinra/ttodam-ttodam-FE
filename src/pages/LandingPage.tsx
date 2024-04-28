import { Button } from '@/components/ui/button';
import logo from '../assets/logo.png';
import mapPin from '../assets/map-pin.png';
import location from '../assets/location.png';
import bookmark from '../assets/bookmark.png';
import chat from '../assets/chat.png';
import star from '../assets/star.png';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserIsLogInStore from '@/store/isLoginStore';

const LandingPageData = [
  {
    img: mapPin,
    title: '동네 사람들과 함께하는 구매!',
    desc: '당신이 원하는 상품을 지금 찾아보세요.',
    color: 'bg-primary/70',
  },
  {
    img: location,
    title: '내 주소를 기반으로 한 장소 검색',
    desc: '동네에서 올라온 글을 확인하세요.',
    color: 'bg-slate-400/80',
  },
  {
    img: bookmark,
    title: '고민이 되시나요?',
    desc: '글을 북마크해서 나중에 다시 확인할 수 있어요.',
    color: 'bg-green-600/80',
  },
  {
    img: star,
    title: '함께 한 회원들을 평가',
    desc: '매너 평가를 통해 더 나은 커뮤니티를 만들어가요.',
    color: 'bg-yellow-400/80',
  },
  {
    img: chat,
    title: '채팅으로 소통',
    desc: '편하게 채팅으로 소통하세요!',
    color: 'bg-red-300/80',
  },
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);


  const { isLoggedIn } = useUserIsLogInStore();
  // const prevSlide = () => {
  //   const newIndex = (currentIndex - 1 + LandingPageData.length) % LandingPageData.length;
  //   setCurrentIndex(newIndex);
  // };
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % LandingPageData.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleSignout = async () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (confirmed) {
      try {
        await signout();
        resetIsLoggedIn();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const content = LandingPageData[currentIndex];
  return (
    <div className="flex flex-col mt-5 w-full h-screen px-10">
      <header className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="w-20 h-20" />
        </Link>
        {isLoggedIn ? (
          <div className="flex gap-5">
            <Link to="/login">
              <Button className="text-md p-5">홈으로</Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link to="/login">
              <Button className="text-md p-5">로그인</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="text-md p-5">
                회원가입
              </Button>
            </Link>
          </div>
        )}
      </header>
      <div className="flex flex-col items-center w-full m-auto gap-y-4 justify-center">
        <div className="bg-primary/80 rounded-full mb-10 p-5 ">
          <img src={content.img} alt="map pin" className="w-24 h-24 hover:scale-125 transition-all" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="text-3xl">{content.title}</div>
          <div className="text-xl text-black/30"> {content.desc}</div>
        </div>
      </div>
    </div>
  );
}
