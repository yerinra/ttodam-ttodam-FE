import { ReactNode, useEffect, useRef, useState } from 'react';
import { KakaoMapContext } from '@/map/useMap';

interface MapProps {
  lat: number;
  lng: number;
}

export default function Map({ lat, lng }: MapProps) {
  const [map, setMap] = useState<kakao.maps.Map | null>();
  const kakaoMapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 예외처리
    if (!kakaoMapRef.current) {
      return;
    }

    const targetPoint = new kakao.maps.LatLng(lat, lng);
    const options = {
      center: targetPoint,
      level: 2,
      draggable: false,
    };

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, options));
  }, [lat, lng]);

  return (
    <div className="w-full h-[300px] mt-5">
      <div className="w-full h-[300px] rounded-2xl -z-0" ref={kakaoMapRef} />
      {map ? (
        <KakaoMapContext.Provider value={map}></KakaoMapContext.Provider>
      ) : (
        <div>지도 정보를 가져오는데 실패하였습니다.</div>
      )}
    </div>
  );
}
