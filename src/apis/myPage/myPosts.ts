import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getMyPosts = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/post/list',
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
