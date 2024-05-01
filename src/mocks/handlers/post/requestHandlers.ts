import { requestsMockData } from '@/mocks/mockData/post/requests';
import { HttpResponse, http } from 'msw';

export const getRequestsHandler = http.get('/post/:postId/request', ({ params }) => {
  const { postId } = params;
  const postIdNum = parseInt(postId as string);

  if (!isNaN(postIdNum)) {
    return HttpResponse.json(requestsMockData);
  }
});

export const putRequestHandler = http.put('/request/:requestId/:requestStatus', () => {
  // const { requestId, requestStatus } = params;
  return new HttpResponse(null, {
    status: 200,
  });
});

export const cancelRequestHandler = http.delete('/request/:requestId', () => {
  return new HttpResponse(null, {
    status: 204,
  });
});

export const postRequestHandler = http.post('/post/:postId/request', () => {
  return HttpResponse.json({
    requestId: 1,
    requestUserId: 3,
    requestUserNickname: '유저3',
    requestStatus: 'WAIT',
    createdAt: '2024-04-29T08:14:33.3567228',
    updatedAt: '2024-04-29T08:14:33.3567228',
  });
});
