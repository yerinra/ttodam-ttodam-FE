import { requestsMockData } from '@/mocks/mockData/post/requests';
import { HttpResponse, http } from 'msw';

export const getRequestsHandler = http.get('/post/:postId/request', ({ params }) => {
  const { postId } = params;
  const postIdNum = parseInt(postId as string);

  if (!isNaN(postIdNum)) {
    return HttpResponse.json(requestsMockData);
  }
});
