import { useEffect } from 'react';
import { useMap } from '@/components/homePage/map/useMap';

export default function usePostDetailMapMarker(lat: number, lng: number) {
  const map = useMap();

  // 마커가 표시될 위치입니다
  const markerPosition = new kakao.maps.LatLng(lat, lng);

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  useEffect(() => {
    // 지도 위에 마커를 표시
    marker.setMap(map);

    return () => {
      marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
}
