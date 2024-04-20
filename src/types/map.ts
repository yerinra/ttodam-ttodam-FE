// 카카오 지도 place 타입
export interface PlaceType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
}
