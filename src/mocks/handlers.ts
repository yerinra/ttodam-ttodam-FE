import { http, HttpResponse } from 'msw';
import { allPosts } from './mockData';

export const handlers = [
  http.get('/post', () => {
    return HttpResponse.json(allPosts);
  }),
  http.get('/post/:categoryName', ({ request }) => {
    const url = request.url.split('/');
    const categoryName = url[url.length - 1];
    const filteredPosts = allPosts.filter(post => post.category === categoryName);
    return HttpResponse.json(filteredPosts);
  }),
];
