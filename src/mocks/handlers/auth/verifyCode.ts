import { http, HttpResponse } from 'msw';

export const verifyCodeHandler = http.get('/users/signup/receive_code', async ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const code = url.searchParams.get('code');
  if (email === 'test@test.com' && code === '123456') return new HttpResponse(null, { status: 200 });
  else {
    return new HttpResponse(null, { status: 400 });
  }
});
