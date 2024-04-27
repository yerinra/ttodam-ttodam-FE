import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { useMap } from './useMap';
import { PlaceType } from '@/types/map';

interface MapSearchInputProps {
  onUpdatePlaces: (places: PlaceType[]) => void;
  onSelect: (placeId: string) => void;
}

// 더미 데이터 만들기 전까지는 지역으로 검색 가능. 추후에 데이터 생성 후 게시글 키워드로 수정
// 지역 검색이여서 기존 SearchInput은 그대로 두고 따로 컴포넌트 분리, 추후에 리팩토링해야 함.
export default function MapSearchInput(props: MapSearchInputProps) {
  const map = useMap();
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState<PlaceTypee[]>([]);
  const [isSearchInput, setIsSearchInput] = useState(false);

  const placeService = useRef<kakao.maps.services.Places | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (placeService.current) {
      return;
    }

    // 장소 검색 객체 생성
    placeService.current = new kakao.maps.services.Places();
  }, []);

  // 키워드 검색 요청
  const searchPlaces = (keyword: string) => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return;
    }

    if (!placeService.current) {
      alert('placeService 에러');
      return;
    }

    // 장소 검색 완료시 호출
    placeService.current.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeInfos = data.map(placeSearchResultItem => {
          return {
            id: placeSearchResultItem.id,
            position: new kakao.maps.LatLng(Number(placeSearchResultItem.y), Number(placeSearchResultItem.x)),
            title: placeSearchResultItem.place_name,
            address: placeSearchResultItem.address_name,
          };
        });

        props.onUpdatePlaces(placeInfos);
        setPlaces(placeInfos);

        // 검색어 입력 여부 상태를 설정하여 리스트 영역 보이도록 함
        setIsSearchInput(true);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(search);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    // 검색어 입력 여부 상태를 검색어 값의 유무에 따라 설정, 리스트 영역 토글
    setIsSearchInput(!!e.target.value);
  };

  // 리스트 클릭시 위치 이동
  const handleItemClick = (place: PlaceType) => {
    map.setCenter(place.position);
    map.setLevel(4);
    props.onSelect(place.id);
  };

  return (
    // <div className="fixed top-[89px] left-0 flex flex-col min-w-[240px] w-full h-[70px] z-[99999] px-5 bg-white my-0 mx-auto">
    <div className="absolute top-0 flex flex-col min-w-[240px] w-full h-[70px] z-[99999] px-5 bg-white my-0 mx-auto">
      <form onSubmit={handleSubmit} className="sticky min-w-[240px] w-full max-w-[768px] h-11 my-0 mx-auto">
        <input
          type="text"
          value={search}
          placeholder="검색어를 입력하세요."
          onChange={handleChange}
          className="min-w-[240px] w-full max-w-[768px] h-11 border border-black rounded hover:border-primary focus:border-primary px-3 py-1 focus:outline-none text-sm search-input"
        />
      </form>
      {isSearchInput && (
        <ul
          ref={listRef}
          className="absolute top-[50px] left-[50%] translate-x-[-50%] min-w-[240px] w-full max-w-[768px] h-40 bg-white overflow-y-auto map-search-list"
        >
          {places.map((item, index) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  handleItemClick(item);
                }}
                className="min-w-[240px] w-full max-w-[768px] h-[60px] bg-white flex flex-col border-b hover:bg-gray-100 py-0 pr-0 pl-3.5"
              >
                <label>{`${index + 1}. ${item.title}`}</label>
                <span>{item.address}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
