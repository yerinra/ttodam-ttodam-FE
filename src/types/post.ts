import { CATEGORIES, SORT_OPTIONS, STATUS } from '@/lib/data';

export type Category = (typeof CATEGORIES)[number]['type'];
export type StatusFilter = (typeof STATUS)[number]['type'];
export type OptionType = (typeof SORT_OPTIONS)[number]['type'];

// export type Post = {
//   Id: number;
//   user: User;
//   title: string;
//   deadline: string;
//   status: Status;
//   category: Category;
//   place: string;
//   pLocationX: number;
//   pLocationY: number;
//   content: string;
//   products: Product[];
//   productImgUrl: string[] | [];
//   participants: number;
//   createAt: string;
//   updateAt: string;
// };

export type PostPreview = {
  postId: number;
  status: Status;
  category?: Exclude<Category, 'ALL'>;
  authorId: number;
  authorNickname: string;
  title: string;
  content: string;
  products: PreviewProduct[];
  createdAt: string;
  updatedAt: string;
};

export type PreviewProduct = {
  productName: string;
  price: number;
  count: number;
};

export type PostDetail = {
  post: {
    postId: number;
    userId: number;
    userNickname: string;
    userManners: number;
    category: Exclude<Category, 'ALL'>;
    status: Status;
    purchaseStatus: PurchaseStatus;
    title: string;
    deadline: string;
    participants: number;
    place: string;
    content: string;
    imgUrls: string[] | [] | null;
    products: Product[];
    createdAt: string;
    updatedAt: string;
    plocationX: number;
    plocationY: number;
  };
  loginUserRequestStatus: UserRequestStatus;
  bookmarkId: number;
  requestList: UserRequest[];
};

export type UserRequest = {
  requestId: number;
  requestUserId: number;
  requestUserNickname: string;
  requestStatus: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseStatus = 'SUCCESS' | 'ON_GOING' | 'ENDED';

export type RequestStatus = 'ACCEPT' | 'REFUSE' | 'WAIT';
export type UserRequestStatus = RequestStatus | 'AUTHOR' | 'NONE';

export type Status = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export type User = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  manners: number;
};

export type Product = {
  productId: number;
  postId: number;
  productName: string;
  price: number;
  count: number;
  purchaseLink?: string;
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
  postImgUrl: string;
  content: string;
};
