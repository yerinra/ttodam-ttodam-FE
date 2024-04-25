import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}


export const loginUser = async (userData: LoginData): Promise<any> => {
  try {
    const response = await axios.post('/user/login', userData);
    return response.data; 
  } catch (error) {
    throw new Error('로그인 실패. 계정 정보를 확인하세요.'); 
  }
};
