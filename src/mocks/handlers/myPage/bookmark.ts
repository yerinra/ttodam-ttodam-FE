import { http, HttpResponse } from 'msw';

const bookmarks: { list: BookMark[] } = {
  list: [
    { id: 1, userId: 1, postId: 1, title: '북마크 제목 1' },
    { id: 2, userId: 1, postId: 2, title: '북마크 제목 2' },
  ],
};

export type BookMark = {
  id: number;
  userId: number;
  postId: number;
  title: string;
};

export const postBookmarkHandler = http.post('/post/:postId/bookmark', async ({ request }) => {
  // const data = await request.json();
  // bookmarks.list = [...bookmarks.list, data]
  return new HttpResponse(null, { status: 201 });
});

export const getBookmarksHandler = http.get('/post/bookmark', () => {
  return HttpResponse.json(bookmarks);
});

export const deleteBookmarkHandler = http.delete(`/post/bookmark/:bookmarkId`, () => {
  return HttpResponse.json({
    message: '북마크가 취소되었습니다.',
  });
});
