import ReactDOM from 'react-dom';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { PlaceType } from '../lib/types';
import { useMap } from './useMap';
import { IoBookmarkSharp } from 'react-icons/io5';

interface MapMarkerProps {
  place: PlaceType;
  showInfo?: boolean;
}

export default function MapMarker(props: MapMarkerProps) {
  const map = useMap();
  const container = useRef(document.createElement('div'));

  const infoWindow = useMemo(() => {
    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: container.current,
    });
  }, []);

  const marker = useMemo(() => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: props.place.position,
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      map.setCenter(props.place.position);
      map.setLevel(4, {
        animate: true,
      });
      infoWindow.setMap(map);
    });

    return marker;
  }, []);

  useLayoutEffect(() => {
    // 지도 위에 마커를 표시
    marker.setMap(map);

    return () => {
      marker.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (props.showInfo) {
      infoWindow.setMap(map);
      return;
    }

    return () => {
      infoWindow.setMap(null);
    };
  }, [props.showInfo]);

  return container.current
    ? ReactDOM.createPortal(
        <div
          onClick={() => {
            infoWindow.setMap(null);
          }}
          className="absolute bottom-[60px] left-0 ml-[-120px] flex flex-col gap-2 w-[260px] px-7 py-4 border border-black rounded-2xl bg-white"
        >
          <strong>게시글 제목</strong>
          <p className="text-sm">{props.place.address}</p>
          <p className="text-sm font-bold">
            모집 상태
            <span className="text-sm ml-1">모집중</span>
          </p>
          <IoBookmarkSharp className="absolute top-[-4px] right-[20px] w-8 h-9 text-yellow-300" />
        </div>,
        container.current,
      )
    : null;
}
