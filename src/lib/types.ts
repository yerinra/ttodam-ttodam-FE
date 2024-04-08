import { CATEGORIES } from './data';

export type category = (typeof CATEGORIES)[number]['type'];


export type postPreview = {
  id: number;
  title: string;
  content: string;
  category: category;
  product_name: string[];
  price: number;
  original_price: number;
  participants: number;
  recruit_status: 'RECRUITING' | 'RECRUITED';
};

// 카카오 지도 place 타입
export interface PlaceType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
}
