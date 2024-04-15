import { http, HttpResponse } from 'msw';

const bookmarks = [];

export const bookmarkHandlers = [
  http.post('/post/:postId', async ({ request }) => {
    const data = await request.json();
    bookmarks.push(data);
    return new HttpResponse(null, { status: 201 });
  }),
];
