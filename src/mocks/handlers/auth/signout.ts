import { HttpResponse, http } from 'msw';

export const signoutHandler = http.post('/users/logout', async () => {
  return new HttpResponse(null, { status: 200 });
});
