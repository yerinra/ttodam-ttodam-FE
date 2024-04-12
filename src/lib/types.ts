import { CATEGORIES } from './data';

export type Category = (typeof CATEGORIES)[number]['type'];

export type Post = {
  Id: number;
  userId: number;
  title: string;
  deadline: string;
  status: Status;
  category: Category;
  place: string;
  pLocationX: number;
  pLocationY: number;
  content: string;
  products: Product[];
  discountRate?: number;
  participants?: number;
  createAt: string;
  updateAt: string;
};

export type Status = 'in_progress' | 'completed' | 'failed';

export type Product = {
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
