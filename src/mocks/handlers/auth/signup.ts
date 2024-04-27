import { HttpResponse, http } from 'msw';

export const signupHandler = http.post('/users/signup', async () => {
  return new HttpResponse(null, { status: 200 });
});
