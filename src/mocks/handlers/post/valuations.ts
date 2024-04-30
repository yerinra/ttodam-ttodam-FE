import { HttpResponse, http } from 'msw';

export const valuationHandler = http.put('/users/activities/:postId/manners/:memberId', () => {
  return HttpResponse.json({
    message: '평가가 제출되었습니다.',
  });
});
