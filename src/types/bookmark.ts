import { Status } from '@/types/post';

export type BookmarkResponse = {
  list: BookMark[];
};

type Product = {
  productName: string;
  price: number;
  count: number;
};

export type BookMark = {
  id: number;
  userId: number;
  postId: number;
  postTitle: string;
  postStatus: Status;
  products: Product[];
};
