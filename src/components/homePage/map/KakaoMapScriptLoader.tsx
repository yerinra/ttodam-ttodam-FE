import Loading from '@/components/atoms/Loading';
import { ReactNode, useEffect, useState } from 'react';

// 카카오 지도 API 연동
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script';
const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_JAVASCRIPT_APP_KEY;

interface KakaoMapScriptLoaderProps {
  children: ReactNode;
}

export default function KakaoMapScriptLoader(props: KakaoMapScriptLoaderProps) {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);

  useEffect(() => {
    const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

    // 예외처리
    if (mapScript && !window.kakao) {
      return;
    }

    const script = document.createElement('script');
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&libraries=services,clusterer,drawing&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      setMapScriptLoaded(false);
    };

    document.getElementById('root')?.appendChild(script);
  }, []);

  return <>{mapScriptLoaded ? props.children : <Loading />}</>;
}
