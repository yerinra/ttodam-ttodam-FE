import { axiosPublic } from '../apiClient';

const verifyAuthenticationCode = async (email: string, code: string) => {
  try {
    const response = await axiosPublic.get('/users/signup/receive_code', { params: { email, code } });
    return response.data;
  } catch (error) {
    throw new Error('인증 코드 확인에 실패했습니다.');
  }
};

export default verifyAuthenticationCode;
