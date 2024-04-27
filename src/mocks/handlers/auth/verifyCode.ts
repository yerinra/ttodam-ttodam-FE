import { http, HttpResponse } from 'msw';

export const verifyCodeHandler = http.post('/api/verify-authentication-code', async () => {
  return new HttpResponse(null, { status: 200 });
});
