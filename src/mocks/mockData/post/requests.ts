import { RequestStatus } from '@/types/post';

export type Request = {
  requestId: number;
  requestUserId: number;
  requestUserNickname: string;
  requestUserManners: number;
  requestStatus: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

export const requestsMockData: Request[] = [
  {
    requestId: 14,
    requestUserId: 3,
    requestUserNickname: 'test3',
    requestUserManners: 4.5,
    requestStatus: 'WAIT',
    createdAt: '2024-04-29T15:45:28',
    updatedAt: '2024-04-29T15:45:28',
  },
  {
    requestId: 15,
    requestUserId: 2,
    requestUserNickname: 'test2',
    requestUserManners: 4.5,
    requestStatus: 'WAIT',
    createdAt: '2024-04-29T15:45:28',
    updatedAt: '2024-04-29T15:45:28',
  },
];
