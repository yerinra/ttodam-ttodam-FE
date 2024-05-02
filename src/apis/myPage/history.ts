import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getHistory = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/users/activities`,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
