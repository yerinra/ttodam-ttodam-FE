import { PURCHASE_STATUS_OPTIONS } from '@/constants/data';
import { CATEGORIES, SORT_OPTIONS, STATUS } from '@/constants/data';

export type Category = (typeof CATEGORIES)[number]['type'];
export type StatusFilter = (typeof STATUS)[number]['type'];
export type OptionType = (typeof SORT_OPTIONS)[number]['type'];

export type PostPreview = {
  postId: number;
  status: Status;
  purchaseStatus?: PurchaseStatus;
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
    authorId: number;
    authorNickname: string;
    authorManners: number;
    category: Exclude<Category, 'ALL'>;
    status: Status;
    purchaseStatus: PurchaseStatus;
    title: string;
    deadline: string;
    participants: number;
    place: string;
    content: string;
    imgUrls: string[] | [];
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
  requestUserManners: number;
  requestStatus: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseStatus = (typeof PURCHASE_STATUS_OPTIONS)[number]['type'];

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

export type PostMapResponse = {
  list: PostMap[];
};

export type PostMap = {
  postList: {
    postId: number;
    authorId: number;
    authorNickname: string;
    place: string;
    plocationX: number;
    plocationY: number;
    category?: Exclude<Category, 'ALL'>;
    status: Status;
    purchaseStatus: PurchaseStatus;
    title: string;
    content: string;
    products: PreviewProduct[];
    createdAt: string;
    updatedAt: string;
    bookmarkId: boolean;
  };
  loginUserLocation: string;
  loginUserLocationX: number;
  loginUserLocationY: number;
};

export type PostEdit = {
  title: string;
  participants: number;
  category: Exclude<Category, 'ALL'>;
  deadline: string;
  content: string;
  place: string;
  products: { productName: string; count: number; purchaseLink: string; price: number }[];
};
