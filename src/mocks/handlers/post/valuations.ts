import { HttpResponse, http } from 'msw';

export const valuationHandler = http.put('/users/activities/manners/:postId', () => {
  return HttpResponse.json({
    message: '평가가 제출되었습니다.',
  });
});
