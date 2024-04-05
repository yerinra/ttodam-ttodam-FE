import { useLayoutEffect, useMemo } from 'react';
import { PlaceType } from '../lib/types';
import { useMap } from './useMap';

interface MapMarkerProps {
  place: PlaceType;
}

export default function MapMarker(props: MapMarkerProps) {
  const map = useMap();

  const marker = useMemo(() => {
    const marker = new kakao.maps.Marker({
      position: props.place.position,
    });

    marker.setMap(map);
    return marker;
  }, []);

  useLayoutEffect(() => {
    // 지도 위에 마커를 표시
    marker.setMap(map);

    return () => {
      marker.setMap(null);
    };
  }, [map]);

  return <div></div>;
}
