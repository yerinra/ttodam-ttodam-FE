import axios from 'axios';

const sendAuthenticationCode = async (email: string) => {
  try {
    const response = await axios.post('/api/send-authentication-code', { email });
    if (response.status === 200) {
      console.log('인증 코드가 성공적으로 전송되었습니다.');
    }
  } catch (error) {
    throw new Error('인증 코드 전송에 실패했습니다.');
  }
};

export default sendAuthenticationCode;
