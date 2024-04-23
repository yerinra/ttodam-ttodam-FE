import { ReactNode, useEffect, useRef, useState } from 'react';
import { KakaoMapContext } from './useMap';

interface MapProps {
  children: ReactNode;
}

//TODO: 지도 이동 기능 추가
export default function Map(props: MapProps) {
  const [map, setMap] = useState<kakao.maps.Map | null>();
  const kakaoMapRef = useRef<HTMLDivElement | null>(null);

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

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, options));
  }, []);

  return (
    // <div className="absolute left-[-50%] top-0 translate-x-2/4 w-full h-full border">
    <div className="relative mx-auto w-full h-3/4">
      <div className="static w-full h-full" ref={kakaoMapRef} />
      {map ? (
        <KakaoMapContext.Provider value={map}>{props.children}</KakaoMapContext.Provider>
      ) : (
        <div>지도 정보를 가져오는데 실패하였습니다.</div>
      )}
    </div>
  );
}
