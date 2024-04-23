import React, { useState } from 'react';
// import { IoBookmarkSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import KakaoMapScriptLoader from '../map/KakaoMapScriptLoader';
import Map from '../map/Map';
import MapSearchInput from '../map/MapSearchInput';

import MapMarkerController from '../map/MapMarkerController';
import { PlaceType } from '@/types/map';
// import { IoBookmarkSharp } from 'react-icons/io5';

// 상품 이름, 주소, 모집인원 데이터에 맞춰서 불러오기
export default function HomePage() {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedId, setSelectedId] = useState('');

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
          />
          <Link
            to="/post/new"
            className="absolute right-5 bottom-5 z-[10] flex items-center justify-center w-10 h-10 border border-black rounded-[50%] bg-black text-white"
          >
            +
          </Link>
        </Map>
      </KakaoMapScriptLoader>
      {/* <Link
        to="/post/new"
        className="absolute bottom-[100px] right-14 flex items-center justify-center w-10 h-10 border border-black rounded-[50%] bg-black text-white"
      > */}
    </div>
  );
}
