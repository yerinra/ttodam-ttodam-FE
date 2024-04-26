import { HistoryMockData } from '@/mocks/mockData/mypage/history';
import { http, HttpResponse } from 'msw';

export type History = {
  id: number;
  userId: number;
  postId: number;
  title: string;
};

export const getHistoryHandler = http.get('/users/activities', () => {
  return HttpResponse.json(HistoryMockData);
});
