import { PreviewProduct, PurchaseStatus, RequestStatus, Status } from './post';

export type History = {
  postId: number;
  userId: number;
  userNickname: string;
  authorId: number;
  authorNickname: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  status: Status;
  requestStatus: RequestStatus;
  purchaseStatus: PurchaseStatus;
  products: PreviewProduct[];
};
