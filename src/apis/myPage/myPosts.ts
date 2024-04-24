import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getMyPosts = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/activities',
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
