import { CATEGORIES } from './data';

export type category = (typeof CATEGORIES)[number]['type'];

export type post = {
  Id: number;
  userId: number;
  title: string;
  deadline: string;
  status: 'in_progress' | 'completed' | 'failed';
  category: category;
  place: string;
  pLocationX: number;
  pLocationY: number;
  content: string;
  products: product[];
  discountRate?: number;
  participants?: number;
  createAt: string;
  updateAt: string;
};

export type product = {
  productId: number;
  productName: string;
  price: number;
  count: number;
  purchaseLink: string;
  productImgUrl: string;
};

// 카카오 지도 place 타입
export interface PlaceType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
}
