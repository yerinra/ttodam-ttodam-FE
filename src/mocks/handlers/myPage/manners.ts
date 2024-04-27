import { HistoryMockData } from '@/mocks/mockData/mypage/history';
import { http, HttpResponse } from 'msw';

export const postMannersHandler = http.get('/users/activities/manners/:membersId', () => {
  return HttpResponse.json(HistoryMockData);
});
