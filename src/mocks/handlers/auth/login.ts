import { http, HttpResponse } from 'msw';

export const loginHandler = http.post('/users/signin', async () => {
  return HttpResponse.json({ message: '로그인 성공', accessToken: 'eyJhbGciOiJIUzVCJ9' });
});
