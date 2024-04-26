import { Category, Product, Status, User } from './post';

export type History = {
  Id: number;
  user: User;
  postId: number;
  title: string;
  status: Status;
  category: Category;
  place: string;
  pLocationX: number;
  pLocationY: number;
  content: string;
  products: Product[];
  productImgUrl: string[] | [];
  participants: number;
  startDate: string;
  endDate: string;
  members: string[];
  isHost: number;
};
