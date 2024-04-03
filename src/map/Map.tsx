import { useEffect, useRef } from 'react';

export default function Map() {
  const kakaoMapRef = useRef<HTMLDivElement | null>(null);
  console.log(kakaoMapRef, 'kakaoMapRef');

  useEffect(() => {
    // 예외처리
    if (!kakaoMapRef.current) {
      return;
    }

    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: targetPoint,
      level: 3,
    };

    new window.kakao.maps.Map(kakaoMapRef.current, options);
  }, []);

  return (
    <div className="absolute left-[-50%] bottom-0 translate-x-2/4 w-full h-full border">
      <div className="static w-full h-full" ref={kakaoMapRef} />
    </div>
  );
}
