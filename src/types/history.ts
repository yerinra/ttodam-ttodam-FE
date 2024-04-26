import { Product, Status } from './post';

export type HistoryResponse = {
  list: History[];
};

export type History = {
  postId: number;
  title: string;
  status: Status;
  products: Product[];
  startDate: string;
  endDate: string;
  members: string[];
  master: number;
};
