import { axiosPublic } from '../apiClient';

interface UserData {
  email: string;
  authenticationCode: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const signUp = async (userData: UserData) => {
  try {
    const response = await axiosPublic.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다.');
  }
};

export default signUp;
