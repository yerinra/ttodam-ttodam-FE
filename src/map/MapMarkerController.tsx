import { useEffect, useState } from 'react';

import MapMarker from './MapMarker';
import { useMap } from './useMap';
import { PlaceType } from '@/types/map';
import { PostMap } from '@/types/post';
import { axiosAccessFn } from '@/apis/apiClient';

interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedId?: string;
}

export default function MapMarkerController(props: MapMarkerControllerProps) {
  const map = useMap();

  const axiosAccess = axiosAccessFn();
  const [, setMapPosts] = useState<PostMap[]>([]);

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
        return (
          <MapMarker
            key={place.id}
            place={place}
            showInfo={props.selectedId === place.id}
            data={{
              postList: {
                postId: 59,
                status: 'IN_PROGRESS',
                category: 'DAILY',
                authorId: 3,
                authorNickname: '유저3',
                title: '물티슈와 휴지 같이 구매하실 분',
                content: '물티슈와 휴지를 같이 삽시다!!',
                products: [
                  {
                    productName: '물티슈',
                    price: 12000,
                    count: 10,
                  },
                  {
                    productName: '휴지',
                    price: 3000,
                    count: 2,
                  },
                ],
                createdAt: '2024-04-18T07:05:40',
                updatedAt: '2024-04-26T16:22:11',
                place: '서울특별시 마포구 양화로 지하188',
                plocationX: 37.555573,
                plocationY: 126.924748,
                purchaseStatus: 'FAILURE',
                bookmarkId: false,
              },
              loginUserLocation: '서울특별시 마포구 양화로 지하188',
              loginUserLocationX: 37.555573,
              loginUserLocationY: 126.924748,
            }}
          />
        );
      })}
    </>
  );
}
