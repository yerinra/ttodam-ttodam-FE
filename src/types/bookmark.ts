import { Product, Status } from '@/types/post';

export type BookmarkResponse = {
  list: BookMark[];
};

export type BookMark = {
  id: number;
  userId: number;
  postId: number;
  postTitle: string;
  postStatus: Status;
  products: Product[];
};
