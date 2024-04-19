import { http } from "msw";

/post/{postId}/request

export const getRequestsHandler = http.get(`/post/bookmark`, () => {
  return HttpResponse.json(bookmarksMockData);
});