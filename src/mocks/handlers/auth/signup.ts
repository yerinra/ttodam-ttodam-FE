import { HttpResponse, http } from 'msw';

export const verifyEmailHandler = http.post('/users/signup', async ({ request }) => {
  const url = new URL(request.url);
  const sendEmail = url.searchParams.get('sendEmail');
  console.log(url);
  if (url.searchParams.size == 0) {
    // 회원가입
    return new HttpResponse(null, { status: 200 });
  } else if (!sendEmail) {
    // 이메일 인증시 이메일 비워둔 경우
    return new HttpResponse(null, { status: 400 });
  } else {
    // 메일 인증
    if (sendEmail === 'test@test.com') {
      // 회원 메일 인증 성공 응답 반환
      return new HttpResponse(null, { status: 200 });
    } else {
      // 이메일이 일치하지 않으면 실패 응답 반환
      return new HttpResponse(null, { status: 400 });
    }
  }
});
