import { useState } from 'react';
// import { IoBookmarkSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import KakaoMapScriptLoader from '../components/homePage/map/KakaoMapScriptLoader';
import Map from '../components/homePage/map/Map';
import MapSearchInput from '../components/homePage/map/MapSearchInput';

import MapMarkerController from '../components/homePage/map/MapMarkerController';
import { PlaceType } from '@/types/map';
import { Pencil1Icon } from '@radix-ui/react-icons';
import useRequireLogin from '@/hooks/useRequireLogin';
import { PostMap } from '@/types/post';
// import { IoBookmarkSharp } from 'react-icons/io5';

// 상품 이름, 주소, 모집인원 데이터에 맞춰서 불러오기
export default function HomePage() {
  useRequireLogin();
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [mapPosts] = useState<PostMap[]>([]);

  return (
    <div className="relative pt-5 w-full h-screen">
      <KakaoMapScriptLoader>
        <Map>
          <MapMarkerController places={places} selectedId={selectedId} />
          <MapSearchInput
            onUpdatePlaces={places => {
              setPlaces(places);
            }}
            onSelect={placeId => {
              setSelectedId(placeId);
            }}
            posts={mapPosts}
          />
          <Link
            to="/post/new"
            className="absolute right-5 bottom-5 z-[10] flex items-center justify-center w-10 h-10 border rounded-[50%] bg-black text-white"
          >
            <Pencil1Icon className="h-4 w-4" />
          </Link>
        </Map>
      </KakaoMapScriptLoader>
    </div>
  );
}
