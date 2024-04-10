import { http, HttpResponse } from 'msw';
import { allPosts } from './mockData';

export const handlers = [
  http.get('/post', () => {
    return HttpResponse.json(allPosts);
  }),
  http.get('/post/:categoryName', ({ params }) => {
    const categoryName = params.categoryName;
    const filteredPosts = allPosts.filter(post => post.category === categoryName);
    return HttpResponse.json(filteredPosts);
  }),
];
