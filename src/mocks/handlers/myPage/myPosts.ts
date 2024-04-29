import { myPostsMockData } from '@/mocks/mockData/post/myPosts';
import { http, HttpResponse } from 'msw';

export const getMyPostsHandler = http.get('/users/post', () => {
  return HttpResponse.json(myPostsMockData);
});
