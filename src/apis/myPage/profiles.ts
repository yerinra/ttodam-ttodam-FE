import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getProfiles = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/profiles',
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
