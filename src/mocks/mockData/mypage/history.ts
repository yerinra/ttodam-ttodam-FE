import { History } from '@/types/history';

export const HistoryMockData: History[] = [
  {
    postId: 59,
    userId: 3,
    userNickname: '유저3',
    authorId: 63,
    authorNickname: '유저11',
    title: '물티슈와 휴지 같이 구매하실 분',
    updatedAt: '2024-04-18 07:05:40',
    createdAt: '2024-04-26 16:22:11',
    status: 'COMPLETED',
    requestStatus: 'REFUSE',
    purchaseStatus: 'SUCCESS',
    products: [
      {
        productName: '물티슈',
        count: 10,
        price: 12000,
      },
      {
        productName: '휴지',
        count: 2,
        price: 3000,
      },
    ],
  },
];
