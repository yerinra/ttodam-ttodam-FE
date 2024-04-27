import { ReactNode, useEffect, useRef, useState } from 'react';
import { KakaoMapContext } from '@/map/useMap';
import usePostDetailMapMarker from '../../hooks/usePostDetailMapMarker';

interface MapProps {
  lat: number;
  lng: number;
  children?: ReactNode;
}

export default function Map({ lat, lng, children }: MapProps) {
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
      level: 3,
      draggable: false,
    };

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, options));
  }, [lat, lng]);

  return (
    <div className="w-full h-[300px] mt-10">
      <div className="w-full h-[240px] md:h-[300px] rounded-2xl -z-0" ref={kakaoMapRef} />
      {map && <KakaoMapContext.Provider value={map}>{children}</KakaoMapContext.Provider>}
    </div>
  );
}
