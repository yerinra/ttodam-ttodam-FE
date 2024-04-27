import { axiosPublic } from '../apiClient';

const verifyAuthenticationCode = async (code: string) => {
  try {
    const response = await axiosPublic.post('/api/verify-authentication-code', { code });
    if (response.status === 200) {
      console.log('인증 코드가 성공적으로 확인되었습니다.');
    }
  } catch (error) {
    throw new Error('인증 코드 확인에 실패했습니다.');
  }
};

export default verifyAuthenticationCode;
