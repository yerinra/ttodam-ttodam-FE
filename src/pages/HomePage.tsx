import React, { useState } from 'react';
import { IoBookmarkSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import KakaoMapScriptLoader from '../map/KakaoMapScriptLoader';
import Map from '../map/Map';
import MapSearchInput from '../map/MapSearchInput';
import { PlaceType } from '../lib/types';
import MapMarkerController from '../map/MapMarkerController';

// 지도영역 카카오 API 불러오기
// 상품 이름, 주소, 모집인원 데이터에 맞춰서 불러오기
export default function HomePage() {
  const [places, setPlaces] = useState<PlaceType[]>([]);

  return (
    <div className="pt-40 w-full h-screen">
      <KakaoMapScriptLoader>
        <Map>
          <MapMarkerController places={places} />
          <MapSearchInput
            onUpdatePlaces={places => {
              setPlaces(places);
            }}
          />
        </Map>
      </KakaoMapScriptLoader>
      <div className="absolute bottom-[60px] left-[50%] translate-x-[-50%] flex flex-col gap-2 w-11/12 px-7 py-4 border border-black rounded-2xl bg-white">
        <strong>게시글 제목</strong>
        <p className="text-sm">서울특별시 강남구 테헤란로 7길 21</p>
        <p className="text-sm font-bold">
          모집 상태
          <span className="text-sm ml-1">모집중</span>
        </p>
        <IoBookmarkSharp className="absolute top-[-4px] right-[20px] w-8 h-9 text-yellow-300" />
      </div>
      <Link
        to="/post/new"
        className="absolute bottom-[180px] right-14 flex items-center justify-center w-10 h-10 border border-black rounded-[50%] bg-black text-white"
      >
        +
      </Link>
    </div>
  );
}
