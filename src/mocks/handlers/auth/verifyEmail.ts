import { http, HttpResponse } from 'msw';

export const verifyEmailHandler = http.post('/api/send-authentication-code', async () => {
  // const { email } = request.body;

  // if (email === 'test@test.com' && pw === 'test1234')
  return new HttpResponse(null, { status: 200 });
});
