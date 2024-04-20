import { User } from '@/lib/types';

export type requestsMockDataType = {
  participationRequests: Request[];
};

export type Request = {
  postId: number;
  requestUserInfo: User;
  requestStatus: 'wait' | null;
};
export const requestsMockData = {
  participationRequests: [
    {
      postId: 2,
      requestUserInfo: {
        id: 3,
        nickname: '홍길동3',
        profileImgUrl: '',
        manners: 1,
      },
      requestStatus: 'wait',
    },
    {
      postId: 2,
      requestUserInfo: {
        id: 11,
        nickname: '익명의유저1',
        profileImgUrl: '',
        manners: 3,
      },
      requestStatus: 'wait',
    },
  ],
};
