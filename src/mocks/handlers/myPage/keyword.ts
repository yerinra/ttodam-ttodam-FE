import { keywordsMockData } from '@/mocks/mockData/mypage/keywords';
import { http, HttpResponse } from 'msw';

export const postKeywordHandler = http.post('/users/keywords', async () => {
  return new HttpResponse(null, { status: 201 });
});

export const getKeywordsHandler = http.get('/users/keywords', () => {
  return HttpResponse.json(keywordsMockData);
});

export const updateKeywordHandler = http.put('/users/keywords', () => {
  return new HttpResponse(null, { status: 201 });
});

export const deleteKeywordHandler = http.delete(`/users/keywords`, () => {
  return new HttpResponse(null, { status: 201 });
});
