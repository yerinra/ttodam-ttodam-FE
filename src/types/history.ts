import { Product, Status } from './post';

export type HistoryResponse = {
  list: History[];
};

export type History = {
  postId: number;
  title: string;
  status: Status;
  products: Product[];
  updatedAt: string;
  createdAt: string;
  members: [{ membersId: number; nickname: string }];
  master: number;
};
