import { http } from 'msw';

const users = [
  { email: 'wasd111@asdf.com', password: '11111111' },
];

export const postloginHandler = http.post('/user/login', (req, res, ctx) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return res(
      ctx.status(200),
      ctx.json({ message: '로그인 성공', accessToken: 'eyJhbGciOiJIUzVCJ9...' })
    );
  } else {
    return res(
      ctx.status(401),
      ctx.json({ message: '로그인 실패', errorCode: 'LOGIN_FAILED' })
    );
  }
});