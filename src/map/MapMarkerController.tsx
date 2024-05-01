import { useEffect, useState } from 'react';

import MapMarker from './MapMarker';
import { useMap } from './useMap';
import { PlaceType } from '@/types/map';
import { axiosAccessFn } from '@/apis/apiClient';
import { PostMap } from '@/types/post';

interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedId?: string;
}

export default function MapMarkerController(props: MapMarkerControllerProps) {
  const map = useMap();

  const axiosAccess = axiosAccessFn();
  const [mapPosts, setMapPosts] = useState<PostMap[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAccess({
          method: 'get',
          url: 'post/map/list',
        });
        setMapPosts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (props.places.length < 1) {
      return;
    }

    const bounds = new window.kakao.maps.LatLngBounds();

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    props.places.forEach(place => {
      bounds.extend(place.position);
    });

    map.setBounds(bounds);
  }, [props.places]);

  return (
    <>
      {props.places.map(place => {
        return <MapMarker key={place.id} place={place} showInfo={props.selectedId === place.id} mapPosts={mapPosts} />;
      })}
    </>
  );
}
