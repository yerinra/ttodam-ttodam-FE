import { RequestResponse } from '@/types/request';

export const requestsMockData: RequestResponse = {
  participationRequests: [
    {
      postId: 2,
      requestUser: {
        id: 3,
        nickname: '홍길동3',
        manners: 1,
      },
      requestStatus: 'wait',
    },
    {
      postId: 2,
      requestUser: {
        id: 11,
        nickname: '익명의유저1',
        manners: 3,
      },
      requestStatus: 'wait',
    },
  ],
};
