import { SignUpFormData } from '@/types/auth';
import { axiosPublic } from '../apiClient';

export const signUp = async (userData: SignUpFormData) => {
  try {
    const response = await axiosPublic.post('/users/signup', userData);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('회원가입에 실패했습니다.');
  }
};
