import { PreviewProduct, Status } from './post';

export type HistoryResponse = {
  list: History[];
};

export type History = {
  postId: number;
  userId: number;
  userNickname: string;
  authorId: number;
  authorNickname: string;
  title: string;
  status: Status;
  requestStatus: string;
  purchaseStatus: string;
  products: PreviewProduct[];
  updatedAt: string;
  createdAt: string;
};
