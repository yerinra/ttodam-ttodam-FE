import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const signout = async () => {
  try {
    await axiosAccess({
      method: 'post',
      url: '/users/logout',
    });
    // return res;
  } catch (error) {
    console.error(error);
  }
};
