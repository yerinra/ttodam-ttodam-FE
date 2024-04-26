import { Post } from '@/types/post';

export type HistoryResponse = {
  list: History[];
};

export type History = {
  id: number;
  postInfo: Post;
};

export const HistoryMockData = {
  list: [
    {
      id: 1,
      postInfo: {
        Id: 2,
        user: {
          id: 1,
          nickname: '익명의유저2',
          profileImgUrl:
            'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
          manners: 5,
        },
        members: ['유저1', '유저2', '유저3'],
        title: '칫솔과 휴지를 함께 사실 분을 모집합니다!',
        startDate: '2024-04-06 10:30:00',
        endDate: '2024-04-11 12:00:00',
        status: 'in_progress',
        products: [
          {
            productId: 3,
            productName: '크리오덴티메이트 칫솔',
            price: 10830,
            count: 30,
            purchaseLink: 'https://smartstore.naver.com/groceryshop/products/123456789',
          },
          {
            productId: 4,
            productName: '하얀티슈 프리미엄',
            price: 30930,
            count: 3,
            purchaseLink: 'https://www.naver.com',
          },
        ],
      },
    },
    {
      id: 2,
      postInfo: {
        Id: 3,
        user: {
          id: 2,
          nickname: '홍길동2',
          profileImgUrl: '',
          manners: 4,
        },
        members: ['유저1', '유저2', '유저3'],
        title: '주방용품 구매 도와주세요',
        startDate: '2024-04-07 14:20:00',
        endDate: '2024-04-12 18:00:00',
        status: 'in_progress',
        products: [
          {
            productId: 5,
            productName: '냄비세트',
            price: 45000,
            count: 1,
            purchaseLink: 'https://smartstore.naver.com/kitchenmart/products/987654321',
          },
          {
            productId: 6,
            productName: '도마',
            price: 8000,
            count: 2,
            purchaseLink: 'https://www.naver.com',
          },
        ],
      },
    },
  ],
};
