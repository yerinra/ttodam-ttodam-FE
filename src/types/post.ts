import { CATEGORIES, SORT_OPTIONS, STATUS } from './data';

export type Category = (typeof CATEGORIES)[number]['type'];
export type StatusFilter = (typeof STATUS)[number]['type'];
export type OptionType = (typeof SORT_OPTIONS)[number]['type'];

export type Post = {
  Id: number;
  user: User;
  title: string;
  deadline: string;
  status: Status;
  category: Category;
  place: string;
  pLocationX: number;
  pLocationY: number;
  content: string;
  products: Product[];
  productImgUrl: string[] | [];
  participants: number;
  createAt: string;
  updateAt: string;
};

export type Status = 'in_progress' | 'completed' | 'failed';

export type User = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  manners: number;
};

export type Product = {
  productId: number;
  productName: string;
  price: number;
  count: number;
  purchaseLink: string;
};

export type PostNew = {
  title: string;
  category: Category;
  deadline: string;
  participants: number;
  place: string;
  productName: string;
  price: number;
  count: number;
  purchaseLink: string;
  productImgUrl: string;
  content: string;
};
