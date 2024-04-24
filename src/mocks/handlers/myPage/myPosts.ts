import { allPosts } from '@/mocks/mockData/post/allPosts';
import { http, HttpResponse } from 'msw';

export const getMyPostsHandler = http.get('/users/activities', () => {
  const myPosts = allPosts.filter(post => post.user.id == 1);
  return HttpResponse.json(myPosts);
});
