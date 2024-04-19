import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getPost = async (postId: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/post/${postId}`,
    });

    return res;
  } catch (error) {
    throw error;
  }
};
