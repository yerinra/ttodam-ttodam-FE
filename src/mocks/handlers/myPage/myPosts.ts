import { myPostsMockData } from '@/mocks/mockData/post/myPosts';
import { http, HttpResponse } from 'msw';

export const getMyPostsHandler = http.get('/users/post/list', () => {
  return HttpResponse.json(myPostsMockData);
});
