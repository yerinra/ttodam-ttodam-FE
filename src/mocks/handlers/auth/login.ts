import { http, HttpResponse } from 'msw';

export const loginHandler = http.post('/users/signin', async ({ request }) => {
  const data = {
    message: '로그인 성공',
    accessToken: 'eyJhbGciOiJIUzVCJ9',
  };
  const result: any = await request.json();
  const email = result?.email;
  const password = result?.password;

  if (email === 'test@test.com' && password === 'test1234') {
    return new HttpResponse(JSON.stringify(data), { status: 200 });
  } else {
    return new HttpResponse(null, {
      status: 400,
      statusText: 'authenticationFailed',
    });
  }
});

export const socialLoginHandler = http.patch('/login/oauth2/code/:domain', async () => {
  return HttpResponse.json({ message: '로그인 성공', accessToken: 'eyJhbGciOiJIUzVCJ9' });
});
