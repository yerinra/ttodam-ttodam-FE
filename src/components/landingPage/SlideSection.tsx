import { LANDING_PAGE_DATA } from '@/constants/data';
import { useEffect, useState } from 'react';

export default function SlideSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % LANDING_PAGE_DATA.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const content = LANDING_PAGE_DATA[currentIndex];
  return (
    <section className="flex flex-col items-center w-full m-auto gap-y-4 justify-center">
      <div className="bg-primary/80 rounded-full mb-10 p-5 ">
        <img src={content.img} alt="map pin" className="w-24 h-24 hover:scale-125 transition-all" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="text-3xl">{content.title}</div>
        <div className="text-xl text-black/30"> {content.desc}</div>
      </div>
    </section>
  );
}
