import { axiosPublic } from '../apiClient';

const sendAuthenticationCode = async (email: string) => {
  try {
    const response = await axiosPublic.post('/users/signup/sendmail', null, {
      params: {
        email,
      },
    });

    if (response.status === 200) {
      console.log('인증 코드가 성공적으로 전송되었습니다.');
    }
  } catch (error) {
    throw new Error('인증 코드 전송에 실패했습니다.');
  }
};

export default sendAuthenticationCode;
