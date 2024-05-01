import { GOOGLE_REDIRECT_URI, KAKAO_REDIRECT_URI } from '@/constants/auth';
import { axiosPublic } from '../apiClient';

export const kakaoLogin = async (code: string) => {
  try {
    const res = await axiosPublic.get(KAKAO_REDIRECT_URI, {
      params: {
        code,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googleLogin = async (code: string) => {
  try {
    const res = await axiosPublic.get(GOOGLE_REDIRECT_URI, {
      params: {
        code,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
