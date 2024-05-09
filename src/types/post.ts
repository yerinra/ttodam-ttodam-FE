import { PURCHASE_STATUS_OPTIONS } from '@/constants/data';
import { CATEGORIES, SORT_OPTIONS, STATUS } from '@/constants/data';
import { z } from 'zod';

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

export const formSchema = z.object({
  title: z
    .string({ required_error: '제목을 입력해주세요.' })
    .min(2, { message: '제목을 두 글자 이상 입력해주세요.' })
    .max(50, { message: '제목은 50글자를 넘을 수 없습니다.' }),
  deadline: z.string({
    required_error: '모집기한을 입력해주세요.',
  }),
  category: z.enum(['DAILY', 'KITCHEN', 'FOOD', 'PET', 'CLOTHING', 'HEALTH', 'OFFICE', 'OTHER'], {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_type) {
        return { message: '카테고리를 선택해주세요.' };
      } else if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: '카테고리 중 하나를 선택해주세요.' };
      } else {
        return { message: ctx.defaultError };
      }
    },
  }),
  participants: z.coerce
    .number({
      required_error: '희망 모집 인원을 선택해주세요.',
      invalid_type_error: '희망 모집 인원 수를 입력해주세요.',
    })
    .min(1),
  place: z.string({ required_error: '만남 장소를 입력해주세요.' }),
  content: z
    .string({ required_error: '내용을 입력해주세요.' })
    .min(10, { message: '내용을 열 글자 이상 입력해주세요.' })
    .max(80, { message: '내용을 80자 이내로 입력해주세요.' }),
  products: z.array(
    z.object({
      productName: z
        .string({ required_error: '상품의 이름을 입력해주세요.' })
        .min(2, { message: '상품의 이름은 두 글자 이상이어야 합니다.' })
        .max(50, { message: '상품의 이름은 50자 이내로 입력해주세요.' }),
      price: z.coerce
        .number({ required_error: '상품의 가격을 입력해주세요.', invalid_type_error: '숫자를 입력해주세요.' })
        .gte(1, { message: '상품은 0원일 수 없습니다.' }),
      count: z.coerce
        .number({ required_error: '상품의 개수를 입력해주세요.', invalid_type_error: '숫자를 입력해주세요.' })
        .gte(1, { message: '1개 이상 입력해주세요.' }),
      purchaseLink: z.string({ required_error: '상품의 링크를 입력해주세요.' }),
    }),
  ),
});

export type PostFormSchema = z.infer<typeof formSchema>;
