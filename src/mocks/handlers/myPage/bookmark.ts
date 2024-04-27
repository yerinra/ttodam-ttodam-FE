import { bookmarksMockData } from '@/mocks/mockData/mypage/bookmarks';
import { http, HttpResponse } from 'msw';

export type BookMark = {
  id: number;
  userId: number;
  postId: number;
  title: string;
};

export const postBookmarkHandler = http.post('/post/:postId/bookmark', async () => {
  return new HttpResponse(null, { status: 201 });
});

export const getBookmarksHandler = http.get('/post/bookmark', () => {
  return HttpResponse.json(bookmarksMockData);
});

export const deleteBookmarkHandler = http.delete(`/post/bookmark/:bookmarkId`, () => {
  return HttpResponse.json({
    message: '북마크가 취소되었습니다.',
  });
});
